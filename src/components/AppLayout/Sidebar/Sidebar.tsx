import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthProvider';
import { SidebarMenus } from './sidebarData';
import { IoBug, IoHome, IoMenu } from 'react-icons/io5';
import { ProfileMenu } from './ProfileMenu';
import { SidebarMenu } from './SidebarMenu';
import { checkPermissions } from '../../../utils/checkPermissions';
import s from './Sidebar.module.scss';

type SidebarProps = { menuExpanded: boolean, showMobile: boolean, toggleMobileMenu: () => void };

const Sidebar = ({ menuExpanded, showMobile, toggleMobileMenu }: SidebarProps) => {
    const { currentUser } = useAuth();
    return (
        <aside className={`${s.sidebar} ${menuExpanded ? s.hidden : ''} ${showMobile ? s.active : ''}`}>
            <div className={s.brand}>
                <Link to='/'>
                    <h1 className='text-lg'>
                        <IoBug />{' '}
                        IssueTracker
                    </h1>
                </Link>
                <button
                    className={`btn btn-outline-light ${s.menuToggleBtn}`}
                    onClick={toggleMobileMenu}
                >
                    <IoMenu />
                </button>
            </div>
            <ProfileMenu />
            <div className={s.rootMenuItem}>
                <div>
                    <div className={s.menuItemIcon}><IoHome /></div>
                    <div className={s.menuItemBody}>
                        <Link to='/' replace>
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>
            {
                SidebarMenus?.length && (
                    <ul className={s.navMenu}>
                        {SidebarMenus.map(item => {
                            if (!checkPermissions(currentUser, item.show_with_permissions)) return null;
                            return <SidebarMenu key={item.title} {...item} />
                        })}
                    </ul>
                )
            }
        </aside>
    );
}

export default Sidebar;
