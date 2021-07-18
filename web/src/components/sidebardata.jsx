import React from 'react'
import * as FaIcons from "react-icons/fa";
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';

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
        title: 'Map',
        path: '/map',
        icon: <FaIcons.FaMapMarked />,
        cName: 'sidebar-text'
    }
]