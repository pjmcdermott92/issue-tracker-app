import { useAuth } from '../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { useToggle } from '../../../hooks/useToggle';
import { checkPermissions } from '../../../utils/checkPermissions';

import s from './Sidebar.module.scss';

type SidebarMenuProps = {
    title: string,
    icon: any,
    show_with_permissions: string[],
    sub_menu?: [],
    link_action?: any
}

export const SidebarMenu = ({ title, icon: Icon, show_with_permissions, sub_menu, link_action }: any) => {
    const [isExpanded, toggleExpanded] = useToggle(false);
    const { currentUser } = useAuth();

    return (
        <li className={s.rootMenuItem}>
            <div>
                <div className={s.menuItemIcon}>{<Icon />}</div>
                <div className={s.menuItemBody}>
                    {sub_menu?.length ? (
                        <a role='button' onClick={toggleExpanded}>
                            {title}
                            <span className={s.menuItemIcon}>{isExpanded ? <IoRemove /> : <IoAdd />}</span>
                        </a>
                    ) : (
                        <Link to={link_action}>{title}</Link>
                    )}
                </div>
            </div>
            {sub_menu?.length && isExpanded && (
                <ul className={s.subMenu}>
                    {sub_menu?.map(({title, icon: Icon, link_action, show_with_permissions}: SidebarMenuProps) => {
                        if (!checkPermissions(currentUser, show_with_permissions)) return null;
                        return (
                            <li key={title}>
                                <Link to={link_action}>
                                    <div className={s.menuItemIcon}><Icon /></div>
                                    <div className={s.menuItemBody}>{title}</div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    )
};
