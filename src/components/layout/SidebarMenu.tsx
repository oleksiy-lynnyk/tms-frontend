import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
    sidebarMenuConfig,
    getProjectSidebarMenuConfig,
    SidebarMenuItem
} from '../../constants/sidebarMenuConfig';

type SidebarMenuProps = {
    projectName?: string;
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({ projectName }) => {
    const { projectId } = useParams<{ projectId?: string }>();
    // Отримуємо налаштування меню проекту, або null
    const projectConfig = projectId ? getProjectSidebarMenuConfig(projectId) : null;

    return (
        <aside className="sidebar-menu">
            {/* === Стара секція логотипу/назви проекту === */}
            {projectConfig && (
                <div className="sidebar-project-section">
                    {/* Старий код показу projectName */}
                    {projectName && (
                        <div className="sidebar-project-name">
                            {projectName}
                        </div>
                    )}
                    {/* === Нова секція пунктів проекту === */}
                    <nav className="sidebar-project-menu">
                        {projectConfig.items.map((item: SidebarMenuItem) => (
                            <NavLink
                                key={item.key}
                                to={item.to}
                                className={({ isActive }) =>
                                    `sidebar-menu-item${isActive ? ' active' : ''}${item.disabled ? ' disabled' : ''}`
                                }
                                style={{ pointerEvents: item.disabled ? 'none' : 'auto' }}
                            >
                                <span className="sidebar-menu-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}

            {/* === Глобальна секція (Projects, Users, Roles, Settings) === */}
            <div className="sidebar-global-section">
                {sidebarMenuConfig.items.map((item: SidebarMenuItem) => (
                    <NavLink
                        key={item.key}
                        to={item.to}
                        className={({ isActive }) =>
                            `sidebar-menu-item${isActive ? ' active' : ''}`
                        }
                    >
                        <span className="sidebar-menu-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default SidebarMenu;
