import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';

const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/auth/ResetPassword'));
const AppLayout = React.lazy(() => import('./components/AppLayout/AppLayout'));
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='/profile' element={<p>TEST</p>} />
                <Route path='*' element={<Navigate to='/' />} />
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
