import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import { useAuth } from './contexts/AuthProvider';

import AlertProvider from './contexts/AlertProvider';

const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/auth/ResetPassword'));

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<TestLayout />} />
            <Route path='/login' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='reset-password' element={<ResetPassword />} />
            </Route>
        </Routes>
    );
}

function TestLayout() {
    const { state, pathname } = useLocation();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return <Navigate to='/login' state={{ url: pathname }} />

    return (
        <AlertProvider>
            <h1>Testing</h1>
        </AlertProvider>
    );
}

export default App;
