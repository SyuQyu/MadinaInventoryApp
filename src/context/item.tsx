import { create } from 'zustand';
import fetchAPI from "../fetch";

export type Item = {
    id?: number;
    code: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    size: string | null;
    stock_min: number;
    item_type_id: number;
    brand_id: number;
    item_type?: any;
    brand?: any;
    created_at?: any;
    updated_at?: any;
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
    createItem: (item: Item, token: string | null) => any;
    updateItem: (id: number, item: Item, token: string | null) => any;
    deleteItem: (id: number, token: string | null) => any;
    fetchItems: () => Promise<any>;
    getItemById: (id: number) => Item | undefined;
    fetchItemsWithParams: (page: number, limit: number, brands: string, types: string, sort: string) => Promise<any>;
};

const useItemStore = create<ItemStore>((set, get) => ({
    items: [],
    errors: [],
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
    createItem: async (item: Item, token) => {
        try {
            const response = await fetchAPI('/items', {
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

            return true;
        } catch (error) {
            console.error(error);
        }
    },
    updateItem: async (id, item: Item, token) => {
        try {
            const response = await fetchAPI(`/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(item),
            });
            const updatedItem = await response.json();
            console.log(updatedItem, 'updatedItem', item, 'item');
            set((state) => ({
                items: state.items.map((i) => (i.id === id ? updatedItem : i)),
            }));

            return true;
        } catch (error) {
            console.error(error);
        }
    },
    deleteItem: async (id, token) => {
        try {
            const res = await fetchAPI(`/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const jsonRes = await res.json();

            set((state) => ({
                items: state.items.filter((i) => i.id !== id),
            }));

            console.log(jsonRes);
            return jsonRes;
        } catch (error) {
            console.error(error);
        }
    },
    fetchItems: async () => {
        try {
            const response = await fetchAPI('/items');
            const items = await response.json();
            const itemsData = await Promise.all(items?.data?.map(async (item: Item) => {
                const brand = await fetchAPI(`/brands/${item.brand_id}`);
                const itemTypeId = await fetchAPI(`/item-types/${item.item_type_id}`);
                return {
                    ...item,
                    brand: await brand.json(),
                    item_type: await itemTypeId.json(),
                    created_at: new Date(item?.created_at).toLocaleDateString(),
                    updated_at: new Date(item?.updated_at).toLocaleDateString(),
                };
            }));
            // console.log(itemsData);
            set({ items: itemsData, meta: items.meta });
            return true;
        } catch (error) {
            console.error(error);
        }
    },
    getItemById: (id) => {
        return get().items.find((item) => item.id === id);
    },
    fetchItemsWithParams: async (page, limit, brands, types, sort) => {
        try {
            let url = `/items`;

            if (page) {
                url += `?page=${page}`;
            }

            if (limit) {
                url += `${page ? '&' : '?'}limit=${limit}`;
            }

            if (brands) {
                url += `${page || limit ? '&' : '?'}brands=${brands}`;
            }

            if (types) {
                url += `${page || limit || brands ? '&' : '?'}types=${types}`;
            }

            if (sort) {
                url += `${page || limit || brands || types ? '&' : '?'}sort=${sort}`;
            }

            console.log(page, limit, brands, types, sort, 'params')

            const response = await fetchAPI(url);
            const items = await response.json();
            const itemsData = await Promise.all(items?.data?.map(async (item: any) => {
                const brand = await fetchAPI(`/brands/${item.brand_id}`);
                const itemTypeId = await fetchAPI(`/item-types/${item.item_type_id}`);
                return {
                    ...item,
                    brand: await brand.json(),
                    item_type: await itemTypeId.json(),
                    created_at: new Date(item?.created_at).toLocaleDateString(),
                    updated_at: new Date(item?.updated_at).toLocaleDateString(),
                };
            }));

            console.log(itemsData, 'fetch with params');
            set({ items: itemsData, meta: items.meta });
            return true;
        } catch (error) {
            console.error(error);
        }
    },
}));

export default useItemStore;
