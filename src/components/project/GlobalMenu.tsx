// src/components/project/GlobalMenu.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const globalMenuItems = [
    { to: '/projects', label: 'Projects' },
    { to: '/users', label: 'Users' },
    { to: '/settings', label: 'Settings' } // (якщо треба)
];

export default function GlobalMenu() {
    return (
        <div className="project-menu d-flex flex-column align-items-start gap-2 p-3 border-end"
             style={{ minWidth: 180, height: '100%' }}>
            {globalMenuItems.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `btn btn-outline-secondary btn-sm w-100 text-start ${isActive ? 'active bg-secondary text-white' : ''}`
                    }
                >
                    {label}
                </NavLink>
            ))}
        </div>
    );
}
