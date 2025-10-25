import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProjectsView  from './entities/project/views/ProjectsView';
import ProjectPage   from './entities/project/views/ProjectPage';
import UsersView     from './entities/users/views/UsersView';

export default function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/projects"    element={<ProjectsView />} />
                <Route path="/users"       element={<UsersView    />} />
                <Route path="/project/:projectId/*" element={<ProjectPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/projects" replace />} />
        </Routes>
    );
}





