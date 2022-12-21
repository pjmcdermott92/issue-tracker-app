import { useAuth } from '../../contexts/AuthProvider';
import { useProjects } from '../../contexts/ProjectProvider';
import withPageTitle from '../../hoc/withPageTitle';
import { IoAdd } from 'react-icons/io5';
import { DashboardStats } from './DashboardStats';
import s from './dashboard.module.scss';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const { projects } = useProjects();

    return (
        <>
        <div className={s.dashboardSectionTop}>
            <h2 className='text-lg'>Welcome, {currentUser?.first_name}!</h2>
            <div>
                <a href='/' className='btn btn-primary'><IoAdd /> Add Project</a>
                <a href='/' className='btn btn-success'><IoAdd /> Add Ticket</a>
            </div>
        </div>
        <DashboardStats
            activeProjects={projects?.length!}
            openTickets={1}
            resolvedTickets={10}
            unassignedTickets={3}
        />
        </>
    )
}

export default withPageTitle(Dashboard, 'Dashboard');
