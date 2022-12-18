import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';

const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/auth/ResetPassword'));
const AppLayout = React.lazy(() => import('./components/AppLayout/AppLayout'));

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<AppLayout />}>
                <Route index element={<h1>Dashboard Route</h1>} />
            </Route>
            <Route path='/login' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='reset-password' element={<ResetPassword />} />
            </Route>
        </Routes>
    );
}

export default App;
