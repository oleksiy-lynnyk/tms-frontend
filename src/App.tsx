// App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectsView from './components/project/ProjectsView';
import ProjectPage from './components/project/ProjectPage';

export default function App() {
    return (
        <Routes>
            <Route path="/projects" element={<ProjectsView />} />
            <Route path="/project/:id/*" element={<ProjectPage />} />
            <Route path="*" element={<Navigate to="/projects" replace />} />
        </Routes>
    );
}


