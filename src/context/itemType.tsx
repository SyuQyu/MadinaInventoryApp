import { create } from 'zustand';

type ItemType = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

type ItemTypeStore = {
    itemTypes: ItemType[];
    addItemType: (itemType: ItemType, token: string) => any;
    updateItemType: (id: number, updatedItemType: ItemType, token: string) => void;
    deleteItemType: (id: number, token: string) => void;
    fetchItemTypes: () => Promise<void>;
};

const useItemTypeStore = create<ItemTypeStore>((set) => ({
    itemTypes: [],
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
                body: JSON.stringify(updatedItemType),
            });
            const updatedItemTypeResponse = await response.json();
            set((state) => ({
                itemTypes: state.itemTypes.map((itemType) => (itemType.id === id ? updatedItemTypeResponse : itemType)),
            }));
        } catch (error) {
            console.error(error);
        }
    },
    deleteItemType: async (id, token) => {
        try {
            await fetch(`https://inventory-app.kaladwipa.com/item-types/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            set((state) => ({ itemTypes: state.itemTypes.filter((itemType) => itemType.id !== id) }))
        } catch (error) {
            console.error(error);
        }
    },
    fetchItemTypes: async () => {
        const response = await fetch('https://inventory-app.kaladwipa.com/item-types');
        const itemTypes = await response.json();
        set({ itemTypes });
    },
}));

export default useItemTypeStore;
