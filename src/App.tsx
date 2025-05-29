// App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProjectsView from './components/project/ProjectsView';
import ProjectPage from './components/project/ProjectPage';

export default function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/projects" element={<ProjectsView />} />
                <Route path="/project/:projectId/*" element={<ProjectPage />} />
                <Route path="*" element={<Navigate to="/projects" replace />} />
            </Route>
        </Routes>
    );
}


