// src/components/layout/MainLayout.tsx
import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../common/Header';
import SidebarMenu from './SidebarMenu'; // 🆕 універсальне меню
import { fetchProject } from '../../api/projectApi';

const MainLayout: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [currentProject, setCurrentProject] = useState<{ name?: string } | undefined>(undefined);

    useEffect(() => {
        if (projectId) {
            fetchProject(projectId).then(setCurrentProject);
        }
    }, [projectId]);

    return (
        <div style={{ height: '100vh', background: '#f9f9fb' }}>
            <Header currentProject={currentProject} />
            <div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
                <SidebarMenu /> {/* 🔁 тепер меню тут */}
                <div className="flex-grow-1 d-flex align-items-start" style={{ minHeight: 'calc(100vh - 56px)' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
