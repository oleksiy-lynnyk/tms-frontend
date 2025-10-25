// src/components/layout/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';

const MainLayout: React.FC = () => (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
        <SidebarMenu />
        <main
            className="flex-grow-1"
            style={{
                position: 'relative',
                overflowY: 'auto',   // скролиться тут
                padding: '16px',      // за потреби
                background: '#f8f9fa',
            }}
        >
            <Outlet />
        </main>
    </div>
);

export default MainLayout;
