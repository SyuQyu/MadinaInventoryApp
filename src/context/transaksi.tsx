import { create } from 'zustand';

type Transaction = {
    id: number;
    items: selectedItems[];
    payment_method: string;
    note: string;
    created_at: string;
    updated_at: string;
};

type Item = {
    id: number;
    code: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    size: string | null;
    stock_min: number;
    item_type_id: number;
    brand_id: number;
    item_type: any;
    brand: any;
    created_at: string;
    updated_at: string;
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
    addTransaction: (transaction: any, token: string | null) => void;
    updateTransaction: (id: number, transaction: Transaction, token: string | null) => void;
    deleteTransaction: (id: number, token: string | null) => void;
    fetchTransactions: (token: string | null) => Promise<void>;
    transactionDetails: (id: number) => any;
    fetchTransactionsWithParams: ({ page, limit, payment, user, type, sort, token }: any) => Promise<void>;
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
        return selectedItem || null;
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
    addTransaction: async (transaction, token) => {
        try {
            console.log(transaction, 'transaction')
            const response = await fetch('https://inventory-app.kaladwipa.com/transactions', {
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
        try {
            const response = await fetch(`https://inventory-app.kaladwipa.com/transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(transaction)
            });
            const data = await response.json();
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
            const response = await fetch(`https://inventory-app.kaladwipa.com/transactions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
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
            const response = await fetch('https://inventory-app.kaladwipa.com/transactions', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            const itemsData = await Promise.all(data?.data?.map(async (item: any) => {
                const details = await Promise.all(item.details.map(async (detail: any) => {
                    const itemResponse = await fetch(`https://inventory-app.kaladwipa.com/items/${detail.item_id}`);
                    const itemData = await itemResponse.json();
                    const brandResponse = await fetch(`https://inventory-app.kaladwipa.com/brands/${itemData.brand_id}`);
                    const brandData = await brandResponse.json();
                    const itemTypeIdResponse = await fetch(`https://inventory-app.kaladwipa.com/item-types/${itemData.item_type_id}`);
                    const itemTypeIdData = await itemTypeIdResponse.json();
                    return {
                        ...detail,
                        item: {
                            ...itemData,
                            brand: brandData.name,
                            item_type: itemTypeIdData.name,
                        },
                        // created_at: new Date(item.created_at).toLocaleDateString(),
                        // updated_at: new Date(item.updated_at).toLocaleDateString(),
                    };
                }));
                const userResponse = await fetch(`https://inventory-app.kaladwipa.com/users/${item.user_id}`, {
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
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    },
    fetchTransactionsWithParams: async ({ page, limit, payment, user, type, sort, token }) => {
        console.log({ page, limit, payment, user, type, sort, token }, 'params')
        try {
            let params;
            if (page) {
                params = new URLSearchParams({ page: page });
            }
            if (limit) {
                params = new URLSearchParams({ limit: limit });
            }
            if (payment) {
                params = new URLSearchParams({ payment: payment });
            }
            if (user) {
                params = new URLSearchParams({ user: user });
            }
            if (type !== '') {
                params = new URLSearchParams({ type: type });
            }
            if (sort !== '') {
                params = new URLSearchParams({ sort: sort });
            }

            const url = `https://inventory-app.kaladwipa.com/transactions?${params?.toString()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data, url, 'data');
            const itemsData = await Promise.all(data?.data?.map(async (item: any) => {
                const details = await Promise.all(item.details.map(async (detail: any) => {
                    const itemResponse = await fetch(`https://inventory-app.kaladwipa.com/items/${detail.item_id}`);
                    const itemData = await itemResponse.json();
                    const brandResponse = await fetch(`https://inventory-app.kaladwipa.com/brands/${itemData.brand_id}`);
                    const brandData = await brandResponse.json();
                    const itemTypeIdResponse = await fetch(`https://inventory-app.kaladwipa.com/item-types/${itemData.item_type_id}`);
                    const itemTypeIdData = await itemTypeIdResponse.json();
                    return {
                        ...detail,
                        item: {
                            ...itemData,
                            brand: brandData.name,
                            item_type: itemTypeIdData.name,
                        },
                        // created_at: new Date(item.created_at).toLocaleDateString(),
                        // updated_at: new Date(item.updated_at).toLocaleDateString(),
                    };
                }));
                const userResponse = await fetch(`https://inventory-app.kaladwipa.com/users/${item.user_id}`, {
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
        } catch (error) {
            console.error(error);
        }
    },
}));

export default useTransactionStore;
