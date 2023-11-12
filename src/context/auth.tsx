import { create } from 'zustand';
import { persist } from "zustand/middleware";
import fetchAPI from "../fetch";

type AuthState = {
    token: string | null;
    isLoggedIn: boolean;
    dataUser: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const useAuth = create<AuthState>() (
    persist(
        (set) => ({
            token: null,
            isLoggedIn: false,
            dataUser: null,
            login: async (email, password) => {
                const response = await fetchAPI('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                
                const { data } = await response.json();
                const token = await data?.token?.token;
                console.log("called", email, password, response.ok, data, token);
                if (response.ok) {
                    set({ token, isLoggedIn: true, dataUser: data.user });
                } else {
                    throw new Error('Login failed');
                }
            },
            logout: () => {
                set({ token: null, isLoggedIn: false, dataUser: null });
            },
        }),{
            name: "auth-storage",
        }
    )
);

export default useAuth;
