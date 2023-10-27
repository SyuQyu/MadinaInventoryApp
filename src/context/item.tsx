import { create } from 'zustand';

type Item = {
    id: number;
    code: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    stock_min: number;
    item_type_id: number;
    brand_id: number;
    item_type: any;
    brand: any;
    created_at: string;
    updated_at: string;
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

type ItemStore = {
    items: Item[];
    meta: Meta;
    createItem: (item: any, token: string | null) => void;
    updateItem: (id: number, item: Item) => void;
    deleteItem: (id: number) => void;
    fetchItems: () => Promise<void>;
    getItemById: (id: number) => Item | undefined;
};

const useItemStore = create<ItemStore>((set, get) => ({
    items: [],
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

    createItem: async (item, token) => {
        try {
            const response = await fetch('https://inventory-app.kaladwipa.com/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(item),
            });
            const createdItem = await response.json();
            console.log(createdItem, 'createdItem', item, 'item');
            set((state) => ({ items: [...state.items, createdItem] }));
            // set((state) => ({ items: [...state.items, item] }))
        } catch (error) {
            console.error(error);
        }
        
    },
    updateItem: (id, item) =>
        set((state) => ({
            items: state.items.map((i) => (i.id === id ? item : i)),
        })),
    deleteItem: (id) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),
    fetchItems: async () => {
        try {
            const response = await fetch('https://inventory-app.kaladwipa.com/items');
            const items = await response.json();
            const itemsData = await Promise.all(items?.data?.map(async (item: Item) => {
                const brand = await fetch(`https://inventory-app.kaladwipa.com/brands/${item.brand_id}`);
                const itemTypeId = await fetch(`https://inventory-app.kaladwipa.com/item-types/${item.item_type_id}`);
                return {
                    ...item,
                    brand: await brand.json(),
                    item_type: await itemTypeId.json(),
                    created_at: new Date(item.created_at).toLocaleDateString(),
                    updated_at: new Date(item.updated_at).toLocaleDateString(),
                };
            }));
            console.log(itemsData);
            set({ items: itemsData, meta: items.meta });
        } catch (error) {
            console.error(error);
        }
    },
    getItemById: (id) => {
        return get().items.find((item) => item.id === id);
    },
}));

export default useItemStore;
