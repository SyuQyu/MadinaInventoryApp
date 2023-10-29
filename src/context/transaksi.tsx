import { create } from 'zustand';

type Transaction = {
    id: number;
    item_id: number;
    user_id: number;
    qty: number;
    type: string;
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
    transactions: Transaction[];
    meta: Meta;
    items: Item[];
    selectedItems: selectedItems[];
    setSelectedItem: (item: selectedItems) => void;
    deleteSelectedItem: (id: number) => void;
    addTransaction: (transaction: Transaction, token: string) => void;
    updateTransaction: (id: number, transaction: Transaction, token: string) => void;
    deleteTransaction: (id: number, token: string) => void;
    fetchTransactions: () => Promise<void>;
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
    idItem: number;
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
            const existingItemIndex = state.selectedItems.findIndex((i) => i.idItem === item.idItem);
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
        const selectedItem = get().selectedItems.find((item) => item.idItem === id);
        return selectedItem || null;
    },
    deleteSelectedItem: (id) => {
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        }));
    },
    addTransaction: async (transaction) => {
        try {
            const response = await fetch('https://inventory-app.kaladwipa.com/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction)
            });
            const newTransaction = await response.json();
            set((state) => ({ transactions: [...state.transactions, newTransaction] }));
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    },
    updateTransaction: async (id, transaction) => {
        try {
            const response = await fetch(`https://inventory-app.kaladwipa.com/transactions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction)
            });
            const data = await response.json();
            set((state) => ({
                transactions: state.transactions.map((t) => (t.id === id ? data : t)),
            }));
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    },
    deleteTransaction: async (id) => {
        try {
            const response = await fetch(`https://inventory-app.kaladwipa.com/transactions/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            set((state) => ({
                transactions: state.transactions.filter((t) => t.id !== id),
            }));
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    },
    fetchTransactions: async () => {
        try {
            const response = await fetch('https://inventory-app.kaladwipa.com/transactions');
            const data = await response.json();
            set({ transactions: data.data, meta: data.meta });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    },
}));

export default useTransactionStore;
