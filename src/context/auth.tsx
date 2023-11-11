import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
type AuthState = {
    token: string | null;
    isLoggedIn: boolean;
    dataUser: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

// const useAuth = create<AuthState>((set) => ({
    
//     token: sessionStorage.getItem('token'),
//     isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false,
//     dataUser: sessionStorage.getItem('dataUser') ? JSON.parse(sessionStorage.getItem('dataUser') as string) : null,
//     login: async (email, password) => {
//         const response = await fetch('https://inventory-app.kaladwipa.com/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });
        
//         console.log("called");
//         const { data } = await response.json();
//         const token = data.token.token;
//         if (response.ok) {
//             console.log(token);
//             localStorage.setItem('isLoggedIn', 'true');
//             sessionStorage.setItem('token', token);
//             console.log(data.user)
//             sessionStorage.setItem('dataUser', JSON.stringify(data.user));
//             set({ token, isLoggedIn: true, dataUser: data.user });
//         } else {
//             throw new Error('Login failed');
//         }
//     },
//     logout: () => {
//         sessionStorage.removeItem('token');
//         set({ token: null, isLoggedIn: false });
//     },
// }));
const useAuth = create<AuthState>() (
    persist(
        (set) => ({
            token: null,
            isLoggedIn: false,
            dataUser: null,
            login: async (email, password) => {
                const response = await fetch('https://inventory-app.kaladwipa.com/login', {
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
                    // console.log(token);
                    // localStorage.setItem('isLoggedIn', 'true');
                    // sessionStorage.setItem('token', token);
                    // console.log(data.user)
                    // sessionStorage.setItem('dataUser', JSON.stringify(data.user));
                    set({ token, isLoggedIn: true, dataUser: data.user });
                } else {
                    throw new Error('Login failed');
                }
            },
            logout: () => {
                // sessionStorage.removeItem('token');
                set({ token: null, isLoggedIn: false, dataUser: null });
            },
        }),{
            name: "auth-storage",
        }
    )
);

export default useAuth;
