import React, { Suspense } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { useLocalStorage } from '../../hooks/useStorage';
import withProviders from '../../hoc/withProviders';
import Loader from '../ui/Loader/Loader';
import s from './AppLayout.module.scss';
import { useToggle } from '../../hooks/useToggle';

const AlertProvider = React.lazy(() => import ('../../contexts/AlertProvider'));
const ProjectProvider = React.lazy(() => import('../../contexts/ProjectProvider'));
const Header = React.lazy(() => import('./Header/Header'));
const Sidebar = React.lazy(() => import ('./Sidebar/Sidebar'));

let providers: React.LazyExoticComponent<any>[] = [
    AlertProvider,
    ProjectProvider
];

const AppLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useLocalStorage(`${import.meta.env.VITE_STORAGE_PREFIX}.menuStatus`, true);
    const [showMobileMenu, toggleMobileMenu] = useToggle(false);
    const { isLoggedIn } = useAuth();
    const { pathname } = useLocation();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


   if (!isLoggedIn) return <Navigate to='/login' state={{ redirectUrl: pathname }} />

    return (
        <Suspense fallback={<Loader fullscreen />}>
            <main className={s.pageWrapper}>
                <Sidebar
                    menuExpanded={isMenuOpen}
                    showMobile={showMobileMenu}
                    toggleMobileMenu={toggleMobileMenu}
                />
                <section className={s.container}>
                    <Header toggleMenu={toggleMenu} toggleMobile={toggleMobileMenu} />
                    <Outlet />
                </section>
            </main>
        </Suspense>
    );
}

export default withProviders(...providers)(AppLayout);
