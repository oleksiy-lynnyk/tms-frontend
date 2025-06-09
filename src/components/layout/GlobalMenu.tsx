import React from 'react';
import { NavLink } from 'react-router-dom';

const GlobalMenu: React.FC = () => {
    return (
        <div className="d-flex flex-column gap-2 p-2">
            <NavLink
                to="/projects"
                className={({ isActive }) =>
                    `btn btn-outline-secondary btn-sm w-100 text-start ${isActive ? 'active bg-secondary text-white' : ''}`
                }
            >
                Projects
            </NavLink>

            <NavLink
                to="/users"
                className={({ isActive }) =>
                    `btn btn-outline-secondary btn-sm w-100 text-start ${isActive ? 'active bg-secondary text-white' : ''}`
                }
            >
                Users
            </NavLink>

            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    `btn btn-outline-secondary btn-sm w-100 text-start ${isActive ? 'active bg-secondary text-white' : ''}`
                }
            >
                Settings
            </NavLink>
        </div>
    );
};

export default GlobalMenu;
