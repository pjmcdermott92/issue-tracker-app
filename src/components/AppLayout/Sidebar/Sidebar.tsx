import s from './Sidebar.module.scss';

type SidebarProps = { menuExpanded: boolean, toggleMenu: () => void };

const Sidebar = ({ menuExpanded, toggleMenu }: SidebarProps) => {

    return (
        <aside
            className={`${s.sidebar} ${menuExpanded ? '' : s.hide}`}
        >
            SIDEBAR
        </aside>
    )
}

export default Sidebar;
