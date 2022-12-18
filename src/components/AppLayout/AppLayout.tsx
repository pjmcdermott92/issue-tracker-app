import React, { Suspense } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { useToggle } from '../../hooks/useToggle';
import withProviders from '../../hoc/withProviders';
import Loader from '../ui/Loader/Loader';
import s from './AppLayout.module.scss';
import { useLocalStorage } from '../../hooks/useStorage';

const AlertProvider = React.lazy(() => import ('../../contexts/AlertProvider'));
const Header = React.lazy(() => import('./Header/Header'));
const Sidebar = React.lazy(() => import ('./Sidebar/Sidebar'));

let providers: React.LazyExoticComponent<any>[] = [
    AlertProvider
];

const AppLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useLocalStorage(`${import.meta.env.VITE_STORAGE_PREFIX}.menuStatus`, true);
    const { isLoggedIn } = useAuth();
    const { pathname } = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

   if (!isLoggedIn) return <Navigate to='/login' state={{ redirectUrl: pathname }} />

   return (
    <Suspense fallback={<Loader fullscreen />}>
        <Header menuExpanded={isMenuOpen} toggleMenu={toggleMenu} />
        <section className={`${s.wrapper} ${isMenuOpen ? s.expanded : ''}`}>
            <Sidebar menuExpanded={isMenuOpen} toggleMenu={toggleMenu} />
            <Outlet />
        </section>
    </Suspense>
   )
}

export default withProviders(...providers)(AppLayout);
