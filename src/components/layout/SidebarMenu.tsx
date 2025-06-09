// src/components/layout/SidebarMenu.tsx
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

interface MenuItem {
    to: string;
    label: string;
    disabled?: boolean;
}

const globalItems: MenuItem[] = [
    { to: '/projects', label: 'Projects' },
    { to: '/users', label: 'Users' },
    { to: '/settings', label: 'Settings' }
];

const projectItems: MenuItem[] = [
    { to: 'cases', label: 'Test Cases' },
    { to: 'test-runs', label: 'Test Runs' },
    { to: 'environments', label: 'Environments' },
    { to: 'configurations', label: 'Configurations' },
    { to: 'versions', label: 'Versions' },
    { to: 'reports', label: 'Reports (soon)', disabled: true }
];

export default function SidebarMenu() {
    const { projectId } = useParams();
    const menuItems = projectId ? projectItems : globalItems;

    return (
        <div className="d-flex flex-column gap-2 p-3 border-end bg-white" style={{ width: 200, height: '100%' }}>
            {menuItems.map(({ to, label, disabled }) => (
                <NavLink
                    key={to}
                    to={projectId ? `/project/${projectId}/${to}` : to}
                    className={({ isActive }) =>
                        `btn btn-sm sidebar-btn app-font ${disabled ? 'disabled' : isActive ? 'active' : 'btn-outline-secondary'}`
                    }
                >
                    {label}
                </NavLink>
            ))}
        </div>
    );
}
