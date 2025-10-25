import React from 'react';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Settings,
    FolderOpenDot,
    FileText,
    TestTube2,
    Beaker,
    Layers,
    BarChart2,
} from 'lucide-react';

export interface SidebarMenuItem {
    key: string;
    to: string;
    label: string;
    icon: React.ReactNode;
    disabled?: boolean;
}

export interface SidebarMenuConfig {
    items: SidebarMenuItem[];
}

export const sidebarMenuConfig: SidebarMenuConfig = {
    items: [
        { key: 'projects', to: '/projects', label: 'Projects', icon: <LayoutDashboard size={18} /> },
        { key: 'users',    to: '/users',    label: 'Users',    icon: <Users size={18} /> },
        { key: 'roles',    to: '/roles',    label: 'Roles',    icon: <Briefcase size={18} /> },
        { key: 'settings', to: '/settings', label: 'Settings', icon: <Settings size={18} /> },
    ],
};

export const getProjectSidebarMenuConfig = (projectId: string): SidebarMenuConfig => ({
    items: [
        { key: 'cases',          to: `/project/${projectId}/cases`,          label: 'Test Cases',     icon: <FolderOpenDot size={18} /> },
        { key: 'test-runs',      to: `/project/${projectId}/test-runs`,     label: 'Test Runs',      icon: <TestTube2 size={18} /> },
        { key: 'environments',   to: `/project/${projectId}/environments`,   label: 'Environments',    icon: <Beaker size={18} /> },
        { key: 'configurations', to: `/project/${projectId}/configurations`, label: 'Configurations', icon: <Layers size={18} /> },
        { key: 'versions',       to: `/project/${projectId}/versions`,       label: 'Versions',       icon: <FileText size={18} /> },
        { key: 'reports',        to: `/project/${projectId}/reports`,        label: 'Reports (soon)', icon: <BarChart2 size={18} />, disabled: true },
    ],
});
