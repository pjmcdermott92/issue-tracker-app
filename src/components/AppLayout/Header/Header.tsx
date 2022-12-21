import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthProvider';
import { useToggle } from '../../../hooks/useToggle';
import { IoIdCardSharp, IoLogOutOutline, IoMailOutline, IoMenu, IoNotifications } from 'react-icons/io5';
import Messages from './Messages';
import Notifications from './Notifications';
import s from './Header.module.scss';
import { useClickOutside } from '../../../hooks/useClickOutside';

type HeaderProps = { toggleMenu: () => void, toggleMobile: () => void };

const Header = ({ toggleMenu, toggleMobile }: HeaderProps) => {
    const [messagesOpen, toggleMessages] = useToggle(false);
    const [notificationsOpen, toggleNotifications] = useToggle(false);
    const [showUserActions, toggleUserActions] = useToggle(false);
    const { currentUser, logout } = useAuth();
    const userInitials = currentUser!.first_name?.split('')[0] + currentUser!.last_name?.split('')[0];
    const userActionMenuRef = useRef<any>();

    useClickOutside(userActionMenuRef, () => showUserActions && toggleUserActions(false));

    return (
        <>
        <header className={`${s.header} bg-white`}>
            <div>
                <button
                    className={`btn btn-light ${s.toggleBtnLg}`}
                    onClick={toggleMenu}
                >
                    <IoMenu />
                </button>
                <button
                    className={`btn btn-light ${s.toggleBtnSm}`}
                    onClick={toggleMobile}
                >
                    <IoMenu />
                </button>
                {/* @TODO: ADD IN SEARCH FUNCTIONALITY */}
            </div>
            <div>
                <button
                    className='btn btn-light'
                    data-active={messagesOpen}
                    onClick={(e: any) => {
                        if (notificationsOpen) toggleNotifications(false);
                        toggleNotifications(false);
                        toggleMessages();
                    }}
                >
                    <IoMailOutline />
                </button>
                <button
                    className='btn btn-light'
                    data-active={notificationsOpen}
                    onClick={(e: any) => {
                        toggleMessages(false);
                        toggleNotifications();
                    }}
                >
                    <IoNotifications />
                </button>
                <button
                    className='btn btn-light'
                    onClick={(e: any) => {
                        e.stopPropagation();
                        toggleUserActions();
                        toggleMessages(false);
                        toggleNotifications(false);
                }}>
                    {userInitials}
                </button>
            </div>
        </header>
        <ul
            className={`${s.dropDownMenu} bg-white rounded ${showUserActions ? s.show : ''}`}
            ref={userActionMenuRef}
            onClick={() => toggleUserActions(false)}
        >
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
        </ul>
        <Messages open={messagesOpen} close={toggleMessages} />
        <Notifications open={notificationsOpen} close={toggleNotifications} />
        </>
    )
}

export default Header;
