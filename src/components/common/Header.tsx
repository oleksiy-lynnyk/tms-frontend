// src/components/common/Header.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type HeaderProps = {
    currentProject?: { name?: string };
    headerRight?: React.ReactNode; // Для кастомних елементів справа
};

const menuItems = [
    { path: '/projects', label: 'Projects' },
    { path: '/users', label: 'Users' },
    { path: '/roles', label: 'Roles' },
    { path: '/settings', label: 'Settings' }
];

const Header: React.FC<HeaderProps> = ({ currentProject, headerRight }) => {
    const location = useLocation();

    return (
        <header className="d-flex align-items-center justify-content-between px-4 py-2 border-bottom"
                style={{ background: "#fff", minHeight: 56 }}>
            <div className="d-flex align-items-center gap-4">
                <span className="fw-bold fs-4 me-3" style={{ letterSpacing: 1 }}>TMS</span>
                {menuItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`app-font px-2 py-1${location.pathname.startsWith(item.path) ? ' fw-bold text-primary' : ''}`}
                        style={{ textDecoration: 'none', fontSize: 16 }}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
            {/* Універсальний блок справа */}
            <div className="app-font fs-6">
                {headerRight ||
                    (currentProject?.name && <span className="text-secondary">/ {currentProject.name}</span>)
                }
            </div>
        </header>
    );
};

export default Header;
