import {
    IoArchive,
    IoBriefcase,
    IoBrowsers,
    IoBrowsersOutline,
    IoCreate,
    IoPeopleSharp,
    IoPersonAddSharp,
    IoPersonSharp,
    IoTicket,
    IoTicketOutline
} from 'react-icons/io5';

export const SidebarMenus = [
    {
        title: 'Users',
        icon: IoPeopleSharp,
        show_with_permissions: [
            'usr-view-usr'
        ],
        sub_menu: [
            {
                title: 'All Users',
                icon: IoPersonSharp,
                show_with_permissions: [
                    'usr-view-usr'
                ],
                link_action: '/users',
            },
            {
                title: 'Invite User',
                icon: IoPersonAddSharp,
                link_action: '/users/invite',
                show_with_permissions: [
                    'user-edit-usr'
                ]
            }
        ]
    },
    {
        title: 'Projects',
        icon: IoBriefcase,
        show_with_permissions: [
            'pjt-view-asg',
            'pjt-view-all'
        ],
        sub_menu: [
            {
                title: 'Add New Project',
                icon: IoCreate,
                link_action: '/projects/add',
                show_with_permissions: [
                    'pjt-create-pjt'
                ]
            },
            {
                title: 'All Projects',
                icon: IoBrowsersOutline,
                link_action: '/projects',
                show_with_permissions: [
                    'pjt-view-all'
                ]
            },
            {
                title: 'My Projects',
                icon: IoBrowsers,
                link_action: '/projects/assigned/:id',
                show_with_permissions: [
                    'pjt-view-asg',
                    'pjt-view-all'
                ]
            },
            {
                title: 'Archived Projects',
                icon: IoArchive,
                link_action: '/projects/archived',
                show_with_permissions: [
                    'pjt-view-all'
                ]
            }
        ],
    },
    {
        title: 'Tickets',
        icon: IoTicket,
        show_with_permissions: [
            'tck-view-all',
            'tck-view-usr',
            'tck-view-prj',
        ],
        sub_menu: [
            {
                title: 'Add New Ticket',
                icon: IoCreate,
                link_action: '/tickets/add',
                show_with_permissions: [
                    'tck-create-asg',
                    'tck-create-all'
                ]
            },
            {
                title: 'View All Tickets',
                icon: IoTicketOutline,
                link_action: '/projects',
                show_with_permissions: [
                    'tck-view-all',
                    'tck-view-usr',
                    'tck-view-prj',
                ]
            },
            {
                title: 'View Closed Tickets',
                icon: IoArchive,
                link_action: '/tickets?status=closed',
                show_with_permissions: [
                    'tck-view-all'
                ]
            }
        ]
    }
];
