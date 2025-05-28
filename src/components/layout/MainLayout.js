// src/components/layout/MainLayout.js
import React from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import SideMenu from '../navigation/SideMenu';

const MainLayout = () => {
    const { projectId } = useParams();

    // Можна тут фетчити info по проекту або передавати projectId у SideMenu/Sidebar
    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <SideMenu currentProjectId={projectId} />
            <div className="flex-grow-1 p-4 app-font" style={{ background: '#f9f9fb', minHeight: '100vh' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
