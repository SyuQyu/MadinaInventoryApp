import { create } from 'zustand';

type ItemType = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

type ItemTypeStore = {
    itemTypes: ItemType[];
    meta: any;
    addItemType: (itemType: ItemType, token: string | null) => any;
    updateItemType: (id: number, updatedItemType: ItemType, token: string | null) => any;
    deleteItemType: (id: number, token: string | null) => void;
    fetchItemTypes: () => Promise<any>;
    getItemTypesById: (id: number) => any | undefined;
    fetchItemTypesWithParams: (page: number, limit: number) => Promise<any>;
};

const useItemTypeStore = create<ItemTypeStore>((set, get) => ({
    itemTypes: [],
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
    addItemType: async (itemType, token) => {
        try {
            const response = await fetch('https://inventory-app.kaladwipa.com/item-types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: itemType,
                }),
            });
            const newItemType = await response.json();
            set((state) => ({ itemTypes: [...state.itemTypes, newItemType] }));
            return newItemType;
        } catch (error) {
            console.error(error);
        }
    },
    updateItemType: async (id, updatedItemType, token) => {
        try {
            const response = await fetch(`https://inventory-app.kaladwipa.com/item-types/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(
                    {
                        name: updatedItemType,
                    }
                ),
            });
            const updatedItemTypeResponse = await response.json();
            console.log(updatedItemTypeResponse);
            set((state) => ({
                itemTypes: state.itemTypes.map((itemType) => (itemType.id === id ? updatedItemTypeResponse : itemType)),
            }));
            return true;
        } catch (error) {
            console.error(error);
        }
    },
    getItemTypesById: (id: number) => {
        return get().itemTypes.find((item) => item.id === id);
    },
    deleteItemType: async (id, token) => {
        try {
            const res = await fetch(`https://inventory-app.kaladwipa.com/item-types/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const jsonRes = await res.json()
            set((state) => ({ itemTypes: state.itemTypes.filter((itemType) => itemType.id !== id) }))
            console.log(jsonRes);
            return jsonRes;
        } catch (error) {
            console.error(error);
        }
    },
    fetchItemTypes: async () => {
        const response = await fetch('https://inventory-app.kaladwipa.com/item-types');
        const itemTypes = await response.json();
        set({ itemTypes });
        return true;
    },
    fetchItemTypesWithParams: async (page, limit) => {
        try {
            let url = `https://inventory-app.kaladwipa.com/item-types`;
            if (page) {
                url += `?page=${page}`;
            }
            if (limit) {
                url += `${page ? '&' : '?'}limit=${limit}`;
            }
            console.log(page, limit, 'params')
            const response = await fetch(url);
            const items = await response.json();
            set({ itemTypes: items.data, meta: items.meta });
            return true;
        } catch (error) {
            console.error(error);
        }
    },
}));

export default useItemTypeStore;
