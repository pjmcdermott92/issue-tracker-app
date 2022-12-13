import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import ResetPassword from './components/auth/ResetPassword';

const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
// const ResetPassword = React.lazy(() => import('./components/auth/ResetPassword'));

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<h1>Homepage</h1>} />
            <Route path='/login' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='reset-password' element={<ResetPassword />} />
            </Route>
        </Routes>
    )
}

export default App;
