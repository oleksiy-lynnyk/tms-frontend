// ProjectMenu.tsx
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

const menuItems = [
    { to: 'cases', label: 'Test Cases' },
    { to: 'test-runs', label: 'Test Runs' },
    { to: 'environments', label: 'Environments' },
    { to: 'configurations', label: 'Configurations' },
    { to: 'versions', label: 'Versions' },
    { to: 'reports', label: 'Reports (soon)', disabled: true },
];

export default function ProjectMenu() {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <div className="sidebar d-flex flex-column p-3 gap-2">
            {menuItems.map(({ to, label, disabled }) => (
                <NavLink
                    key={to}
                    to={`/project/${projectId}/${to}`}
                    className={({ isActive }) =>
                        `btn btn-outline-secondary btn-sm w-100 text-start ${disabled ? 'disabled' : ''} ${isActive ? 'active bg-secondary text-white' : ''}`
                    }
                >
                    {label}
                </NavLink>
            ))}
        </div>
    );
}
