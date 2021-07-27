import React from 'react'
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

export const SidebarData = [
    {
        title: 'Profile',
        path: '/myprofile',
        icon: <PersonIcon />,
        cName: 'sidebar-text'
    },
    {
        title: 'Groups',
        path: '/groups',
        icon: <GroupIcon />,
        cName: 'sidebar-text'
    },
    {
        title: 'Invitations',
        path: '/invitations',
        icon: <NotificationImportantIcon />,
        cName: 'sidebar-text'
    }
]