import React, { useContext, useState, useEffect } from 'react';
import { useCookies } from '../hooks/useCookies';
import { getCurrentUser, logoutUser } from '../services/auth-service';

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
type Logout = () => void;

const AuthContext = React.createContext<{
    currentUser: CurrentUser, isLoggedIn: IsLoggedIn, getIdentity: GetIdentity, logout: Logout
} | undefined>(undefined);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
    const { getCookie } = useCookies();

    const getIdentity = () => getCurrentUser().then(user => user.success && setCurrentUser(user.data));
    const logout = () => logoutUser().then(res => res.success && setCurrentUser(null));

    useEffect(() => {
        if (getCookie('token')?.length) getIdentity();
    }, []);

    const value = {
        currentUser,
        isLoggedIn: !!currentUser?._id,
        getIdentity,
        logout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export { AuthProvider, useAuth };
