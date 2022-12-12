import React, { useContext, useState, useEffect } from 'react';
import { useCookies } from '../hooks/useCookies';

interface User {
    _id: string,
    first_name: string,
    last_name: string,
    display_name: string,
    email: string,
    roles: string[]
}

type AuthProviderProps = { children: React.ReactNode };
type CurrentUser = User | null;
type IsLoggedIn = boolean;
type GetIdentity = () => void;

const AuthContext = React.createContext<{
    currentUser: CurrentUser, isLoggedIn: IsLoggedIn, getIdentity: GetIdentity
} | undefined>(undefined);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
    const { getCookie } = useCookies();

    const getIdentity = () => import('../services/api').then(module => {
        module.api.get(`${import.meta.env.VITE_SERVER_URL}/users/me`)
            .then(user => {
                if (user.success) setCurrentUser(user.value);
            });
    });

    useEffect(() => {
        if (getCookie('token')?.length) getIdentity();
    }, []);

    const value = {
        currentUser,
        isLoggedIn: !!currentUser?._id,
        getIdentity
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export { AuthProvider, useAuth };
