import React from 'react';
import { IoMailOutline, IoMenu, IoNotifications } from 'react-icons/io5';
import s from './Header.module.scss';

type HeaderProps = { menuExpanded: boolean, toggleMenu: () => void };


const Header = ({ menuExpanded, toggleMenu }: HeaderProps) => {

    return (
        <header className={`${s.header} ${menuExpanded ? s.expanded : ''} bg-white`}>
            <div>
                <button
                    className='btn btn-light'
                    onClick={toggleMenu}
                >
                    <IoMenu />
                </button>
                {/* @TODO: ADD IN SEARCH FUNCTIONALITY */}
            </div>
            <div>
                <button className='btn btn-light'>
                    <IoMailOutline />
                </button>
                <button className='btn btn-light'>
                    <IoNotifications />
                </button>
                <button className='btn btn-light'>
                    DA
                </button>
            </div>
        </header>
    )
}

export default Header;
