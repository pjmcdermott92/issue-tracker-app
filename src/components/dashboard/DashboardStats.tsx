import { IoAlbums, IoTicket, IoCheckmark, IoAlert } from 'react-icons/io5';
import s from './dashboard.module.scss';

type DashboardStatsProps = {
    activeProjects: number
    openTickets: number
    resolvedTickets: number
    unassignedTickets: number
}

export const DashboardStats = ({
        activeProjects,
        openTickets,
        resolvedTickets,
        unassignedTickets
    }: DashboardStatsProps) => {
    const STATS = [
        {
            name: 'Active Projects',
            icon: <IoAlbums />,
            color: 'primary',
            count: activeProjects
        },
        {
            name: 'Open Tickets',
            icon: <IoTicket />,
            color: 'warning',
            count: openTickets
        },
        {
            name: 'Resolved Tickets',
            icon: <IoCheckmark />,
            color: 'success',
            count: resolvedTickets
        },
        {
            name: 'Unassigned Tickets',
            icon: <IoAlert />,
            color: 'danger',
            count: unassignedTickets
        },
    ]

    return (
        <div className={`${s.dashboardStats} p-1`}>
            {STATS?.length && STATS.map(({ name, icon, color, count }) => (
                <div key={`${name}-${color}`} className={`${s.statCard} card p-1 rounded`}>
                    <div className={s.statInfo}>
                        <h4>{name}</h4>
                        <h3 className={`text-${color}`}>{count}</h3>
                    </div>
                    <div className={`${s.statIcon} rounded-circle`} data-variant={color}>
                        {icon}
                    </div>
                </div>
            ))}
        </div>
    )
}