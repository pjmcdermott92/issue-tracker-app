import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/ui/Loader/Loader';

const AuthLayout = React.lazy(() => import('./components/auth/AuthLayout'));
const Login = React.lazy(() => import('./components/auth/Login'));

const App = () => {
    return (
        <Suspense fallback={<Loader fullscreen />}>
            <Routes>
                <Route path='/login' element={<AuthLayout />}>
                    <Route index element={<Login />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default App;
