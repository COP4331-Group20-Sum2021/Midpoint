import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";

export const SidebarData = [
    {
        title: 'Profile',
        path: '/myprofile',
        icon: <HiIcons.HiUser />,
        cName: 'sidebar-text'
    },
    {
        title: 'Groups',
        path: '/groups',
        icon: <HiIcons.HiUserGroup />,
        cName: 'sidebar-text'
    },
    {
        title: 'Map',
        path: '/map',
        icon: <FaIcons.FaMapMarked />,
        cName: 'sidebar-text'
    }
]