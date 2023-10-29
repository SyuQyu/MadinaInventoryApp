import { create } from 'zustand';

type Brand = {
    id: number;
    name: string;
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

type BrandStore = {
    brands: Brand[];
    meta: Meta;
    addBrand: (brand: string, token: string) => any;
    updateBrand: (id: number, updatedBrand: string, token: string) => void;
    deleteBrand: (id: number, token: string) => void;
    fetchBrands: () => Promise<void>;
};

const useBrandStore = create<BrandStore>((set) => ({
    brands: [],
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
    addBrand: async (brand, token) => {
        try {
            const response = await fetch('https://inventory-app.kaladwipa.com/brands', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: brand,
                }),
            });
            const newBrand = await response.json();
            set((state) => ({ brands: [...state.brands, newBrand] }));
            return newBrand;
        } catch (error) {
            console.error(error);
        }
    },
    updateBrand: async (id, updatedBrand, token) => {
        try {
            const response = await fetch(`https://inventory-app.kaladwipa.com/brands/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedBrand),
            });
            const updatedBrandResponse = await response.json();
            set((state) => ({
                brands: state.brands.map((brand) => (brand.id === id ? updatedBrandResponse : brand)),
            }));
        } catch (error) {
            console.error(error);
        }
    },
    deleteBrand: async (id, token) => {
        try {
            await fetch(`https://inventory-app.kaladwipa.com/brands/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            set((state) => ({ brands: state.brands.filter((brand) => brand.id !== id) }))
        } catch (error) {
            console.error(error);
        }
    },
    fetchBrands: async () => {
        const response = await fetch('https://inventory-app.kaladwipa.com/brands');
        const brands = await response.json();
        set({ brands: brands.data, meta: brands.meta });
    },
}));

export default useBrandStore;