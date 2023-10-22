import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    loginState: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    loginState: false,
    login: () => { },
    logout: () => { },
});
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: any = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if the user is already logged in using localStorage
    useEffect(() => {
        const storedLoginState = localStorage.getItem('isLoggedIn');
        if (storedLoginState === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const loginState = isLoggedIn;
    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <AuthContext.Provider value={{ loginState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
