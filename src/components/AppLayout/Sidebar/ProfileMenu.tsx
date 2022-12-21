import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthProvider';
import { useToggle } from '../../../hooks/useToggle';
import {
    IoAdd,
    IoIdCardSharp,
    IoLogOutOutline,
    IoPersonCircleSharp,
    IoRemove
} from 'react-icons/io5';
import s from './Sidebar.module.scss';

export const ProfileMenu = () => {
    const [isExpanded, toggleExpanded] = useToggle(false);
    const { currentUser, logout } = useAuth();

    return (
        <div className={s.userProfileMenu}>
            <div className={s.rootMenuItem}>
                <div>
                    <div className={s.menuItemIcon}><IoPersonCircleSharp /></div>
                    <div className={s.menuItemBody}>
                        <a
                            role='button'
                            onClick={toggleExpanded}
                        >
                            {currentUser?.display_name}
                            <span className={s.menuItemIcon}>{isExpanded ? <IoRemove /> : <IoAdd />}</span>
                        </a>
                    </div>
                </div>
                {isExpanded && <ul className={s.subMenu}>
                    <li>
                        <Link to='/profile'>
                            <div className={s.menuItemIcon}>
                                <IoIdCardSharp />
                            </div>
                            <div className={s.menuItemBody}>
                                Profile
                            </div>
                        </Link>
                    </li>
                    <li>
                        <a role='button' onClick={logout}>
                            <div className={s.menuItemIcon}><IoLogOutOutline /></div>
                            <div className={s.menuItemBody}>
                                Log Out
                            </div>
                        </a>
                    </li>
                </ul>}
            </div>
        </div>
    );
}
