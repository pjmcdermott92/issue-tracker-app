import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { IoBug } from 'react-icons/io5';
import Loader from '../ui/Loader/Loader';
import s from './auth.module.scss';

const AuthLayout = () => {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) return <Navigate to='/' />

    return (
        <Suspense fallback={<Loader fullscreen />}>
            <div className={s.wrapper}>
                <div className={s.container}>
                    <h1 className={`${s.appBrand} text-lg text-center`}>
                        <IoBug /> IssueTracker
                    </h1>
                    <p className='text-md text-center mt-1 mb-2'>
                        The All-In-One Solution for Managing Your Development Projects.
                    </p>
                    <Outlet />
                </div>
            </div>
        </Suspense>
    )
}

export default AuthLayout;
