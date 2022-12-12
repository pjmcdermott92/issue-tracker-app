import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import Loader from './components/ui/Loader/Loader';

const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<h1>Homepage</h1>} />
            <Route path='/login' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
            </Route>
        </Routes>
    )
}

export default App;
