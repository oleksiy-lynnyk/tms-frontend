// src/components/project/ProjectMenu.tsx
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

export default function ProjectMenu() {
    const { id: projectId } = useParams<{ id: string }>();

    return (
        <div className="project-menu d-flex flex-column align-items-start gap-2 p-3 border-end" style={{ minWidth: 180, height: '100%' }}>
            <NavLink to="/projects" className="mb-3 btn btn-outline-secondary btn-sm">
                ← Back to Projects
            </NavLink>
            <NavLink to={`/project/${projectId}/cases`} className="btn btn-outline-secondary btn-sm">
                Test Cases
            </NavLink>
            <NavLink to={`/project/${projectId}/suites`} className="btn btn-outline-secondary btn-sm">
                Suites
            </NavLink>
            <NavLink to={`/project/${projectId}/test-runs`} className="btn btn-outline-secondary btn-sm">
                Test Runs
            </NavLink>
            <NavLink to={`/project/${projectId}/reports`} className="btn btn-outline-secondary btn-sm disabled">
                Reports (soon)
            </NavLink>
        </div>
    );
}
