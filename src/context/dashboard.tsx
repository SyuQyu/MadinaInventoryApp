import { create } from 'zustand';
import fetchAPI from "../fetch";

type DashboardState = {
    data: any;
    isLoading: boolean;
    error: string | null;
    fetchData: (token: string | null, filter: string) => Promise<void>;
    fetchDashboard: (token: string | null, filter: string) => Promise<void>;
};

const useDashboardStore = create<DashboardState>((set) => ({
    data: {},
    isLoading: false,
    error: null,
    fetchDashboard: async (token, filter = 'today') => {
        try {
            const params = new URLSearchParams({ filter: filter });
            const response = await fetchAPI(`/dashboard?${params?.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            set({ data });
        } catch (error) {
            console.error(error);
        }
    },
    fetchData: async (token, filter = 'today') => {
        set({ isLoading: true });
        try {
            const params = new URLSearchParams({ filter: filter });
            const response = await fetchAPI(`/dashboard?${params?.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            set({ data: data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useDashboardStore;
