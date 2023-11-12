import { create } from 'zustand';
import fetchAPI from "../fetch";
import { Item } from "./item";

export type Transaction = {
    id?: number;
    items: selectedItems[];
    payment_method: string;
    note?: string;
    created_at?: string;
    updated_at?: string;
};

type TransactionStore = {
    transactions: any;
    meta: Meta;
    items: Item[];
    selectedItems: selectedItems[];
    deleteAllSelectedItems: () => void;
    setSelectedItem: (item: selectedItems) => void;
    getSelectedItemById: (id: number) => selectedItems | null;
    deleteSelectedItem: (id: number) => void;
    addTransaction: (transaction: any, token: string | null) => any;
    updateTransaction: (id: number, transaction: any, token: string | null) => void;
    deleteTransaction: (id: number, token: string | null) => void;
    fetchTransactions: (token: string | null) => Promise<any>;
    transactionDetails: (id: number) => any;
    fetchTransactionsWithParams: ({ page, limit, payment, user, type, sort, token }: any) => Promise<any>;
};

type Meta = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    previous_page_url: string | null;
};

type selectedItems = {
    id: number;
    qty: number;
}

const useTransactionStore = create<TransactionStore>((set, get) => ({
    transactions: [],
    meta: {
        total: 0,
        per_page: 0,
        current_page: 0,
        last_page: 0,
        first_page: 0,
        first_page_url: '',
        last_page_url: '',
        next_page_url: null,
        previous_page_url: null,
    },
    items: [
        {
            id: 0,
            code: '',
            name: '',
            description: '',
            price: 0,
            stock: 0,
            size: '',
            stock_min: 0,
            item_type_id: 0,
            brand_id: 0,
            item_type: '',
            brand: '',
            created_at: '',
            updated_at: '',
        }
    ],
    errors: [],
    selectedItems: [],
    setSelectedItem: (item) => {
        console.log(item, get().selectedItems);
        set((state) => {
            const existingItemIndex = state.selectedItems.findIndex((i) => i.id === item.id);
            if (existingItemIndex !== -1) {
                const updatedItems = [...state.selectedItems];
                updatedItems[existingItemIndex].qty += item.qty;
                return { selectedItems: updatedItems };
            } else {
                return { selectedItems: [...state.selectedItems, item] };
            }
        });
    },
    getSelectedItemById: (id: number) => {
        const selectedItem = get().selectedItems.find((item) => item.id === id);
        if (selectedItem) {
            return selectedItem;
        } else {
            // Jika item tidak ditemukan, buat item baru dengan qty default
            return { id: id, qty: 0 };
        }
    },
    deleteSelectedItem: (id: number) => {
        set((state) => {
            const updatedItems = state.selectedItems.filter((item) => item.id !== id);
            return { selectedItems: updatedItems };
        });
    },
    deleteAllSelectedItems: () => {
        set({ selectedItems: [] });
    },
    addTransaction: async (transaction: Transaction, token) => {
        try {
            console.log(transaction, 'transaction')
            const response = await fetchAPI('/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(transaction)
            });
            const newTransaction = await response.json();
            console.log(newTransaction, 'newTransaction')
            set((state) => ({ transactions: [...state.transactions, newTransaction] }));
            return true;
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    },
    updateTransaction: async (id, transaction, token) => {
        console.log(id, transaction, token, 'update')
        try {
            const response = await fetchAPI(`/transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(transaction)
            });
            const data = await response.json();
            console.log(response, 'data yes disini')
            set((state) => ({
                transactions: state.transactions.map((t: any) => (t.id === id ? data : t)),
            }));
            return true;
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    },
    transactionDetails: (id) => {
        const detailTransaction = get().transactions.find((item: any) => item.id === id);
        console.log(detailTransaction, 'detailTransaction');
        return detailTransaction || null;
    },
    deleteTransaction: async (id, token) => {
        try {
            const res = await fetchAPI(`/transactions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(await res.json(), 'delete')

            set((state) => ({
                transactions: state.transactions.filter((t: any) => t.id !== id),
            }));

            return true;
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    },
    fetchTransactions: async (token) => {
        try {
            const response = await fetchAPI('/transactions', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            const itemsData = await Promise.all(data?.data?.map(async (item: any) => {
                const details = await Promise.all(item.details.map(async (detail: any) => {
                    const itemResponse = await fetchAPI(`/items/${detail.item_id}`);
                    const itemData = await itemResponse.json();
                    const brandResponse = await fetchAPI(`/brands/${itemData.brand_id}`);
                    const brandData = await brandResponse.json();
                    const itemTypeIdResponse = await fetchAPI(`/item-types/${itemData.item_type_id}`);
                    const itemTypeIdData = await itemTypeIdResponse.json();
                    return {
                        ...detail,
                        item: {
                            ...itemData,
                            brand: brandData.name,
                            item_type: itemTypeIdData.name,
                        },
                    };
                }));

                const userResponse = await fetchAPI(`/users/${item.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const userData = await userResponse.json();

                return {
                    ...item,
                    user_name: userData.name,
                    details,
                    created_at: new Date(item.created_at).toLocaleDateString(),
                    updated_at: new Date(item.updated_at).toLocaleDateString(),
                };
            }));

            console.log(itemsData);
            set({ transactions: itemsData, meta: data.meta });
            return true;
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    },
    fetchTransactionsWithParams: async ({ page, limit, payment, user, type, sort, token }) => {
        console.log({ page, limit, payment, user, type, sort, token }, 'params')
        try {

            let url = `/transactions`;

            if (page) {
                url += `?page=${page}`;
            }

            if (limit) {
                url += `${page ? '&' : '?'}limit=${limit}`;
            }

            if (payment) {
                url += `${page || limit ? '&' : '?'}payment=${payment}`;
            }

            if (user) {
                url += `${page || limit || payment ? '&' : '?'}user=${user}`;
            }

            if (type) {
                url += `${page || limit || payment || user ? '&' : '?'}type=${type}`;
            }

            if (sort) {
                url += `${page || limit || payment || user || type ? '&' : '?'}sort=${sort}`;
            }

            const response = await fetchAPI(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data, url, 'data');
            const itemsData = await Promise.all(data?.data?.map(async (item: any) => {
                const details = await Promise.all(item.details.map(async (detail: any) => {
                    const itemResponse = await fetchAPI(`/items/${detail.item_id}`);
                    const itemData = await itemResponse.json();
                    const brandResponse = await fetchAPI(`/brands/${itemData.brand_id}`);
                    const brandData = await brandResponse.json();
                    const itemTypeIdResponse = await fetchAPI(`/item-types/${itemData.item_type_id}`);
                    const itemTypeIdData = await itemTypeIdResponse.json();
                    return {
                        ...detail,
                        item: {
                            ...itemData,
                            brand: brandData.name,
                            item_type: itemTypeIdData.name,
                        },
                    };
                }));

                const userResponse = await fetchAPI(`/users/${item.user_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const userData = await userResponse.json();

                return {
                    ...item,
                    user_name: userData.name,
                    details,
                    created_at: new Date(item.created_at).toLocaleDateString(),
                    updated_at: new Date(item.updated_at).toLocaleDateString(),
                };
            }));
            console.log(itemsData, 'fetch with params');
            set({ transactions: itemsData, meta: data.meta });
            return true;
        } catch (error) {
            console.error(error);
        }
    },
}));

export default useTransactionStore;
