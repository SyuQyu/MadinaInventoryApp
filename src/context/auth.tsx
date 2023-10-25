import { create } from 'zustand';

type AuthState = {
    token: string | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const useAuth = create<AuthState>((set) => ({
    token: sessionStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false,
    login: async (email, password) => {
        const response = await fetch('https://inventory-app.kaladwipa.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        console.log("called");
        const { data } = await response.json();
        const token = data.token.token;
        if (response.ok) {
            console.log(token);
            localStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('token', token);
            set({ token, isLoggedIn: true });
        } else {
            throw new Error('Login failed');
        }
    },
    logout: () => {
        sessionStorage.removeItem('token');
        set({ token: null, isLoggedIn: false });
    },
}));

export default useAuth;
