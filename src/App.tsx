// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProjectsView from './components/project/ProjectsView';
import ProjectPage from './components/project/ProjectPage';
import UsersView from './components/users/UsersView';
import { routes } from './routes';

export default function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path={routes.projects} element={<ProjectsView />} />
                <Route path={routes.users} element={<UsersView />} />
                <Route path={routes.projectPath} element={<ProjectPage />} />
                <Route path="*" element={<Navigate to={routes.projects} replace />} />
            </Route>
        </Routes>
    );
}





