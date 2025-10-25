// src/entities/project/views/ProjectPage.tsx

import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

import SuiteCaseView from '../../testSuite/views/SuiteCaseView';
import TestRunsView from '../../testRun/views/TestRunsView';
import EnvironmentsView from '../../environment/views/EnvironmentsView';
import ConfigurationsView from '../../configuration/views/ConfigurationsView';
import VersionsView from '../../version/views/VersionsView';

const ProjectPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    if (!projectId) return null;

    return (
        <Routes>
            <Route index element={<Navigate to="cases" replace />} />
            <Route path="cases" element={<SuiteCaseView projectId={projectId} />} />
            <Route path="test-runs" element={<TestRunsView projectId={projectId} />} />
            <Route path="environments" element={<EnvironmentsView projectId={projectId} />} />
            <Route path="configurations" element={<ConfigurationsView projectId={projectId} />} />
            <Route path="versions" element={<VersionsView projectId={projectId} />} />
            <Route path="*" element={<Navigate to="cases" replace />} />
        </Routes>
    );
};

export default ProjectPage;
