import React, { useState } from 'react';
import { useParams, Routes, Route, Navigate } from 'react-router-dom';
import ProjectMenu from './ProjectMenu';
import TestSuiteSidebar from '../testSuite/TestSuiteSidebar';
import TestCaseView from '../testCase/TestCaseView';
import TestRunsView from '../testRun/TestRunsView';
import type { TestSuiteDTO } from '../../types';

const ProjectPage: React.FC = () => {
    const { id: projectId } = useParams<{ id: string }>();
    const [selectedSuite, setSelectedSuite] = useState<TestSuiteDTO | null>(null);
    const [sidebarRefreshFlag, setSidebarRefreshFlag] = useState(0);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    if (!projectId) {
        return <Navigate to="/projects" replace />;
    }

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <ProjectMenu />
            <div className="flex-grow-1 d-flex" style={{ minHeight: '100vh', overflow: 'hidden' }}>
                <Routes>
                    <Route
                        path="cases"
                        element={
                            <>
                                <TestSuiteSidebar
                                    projectId={projectId}
                                    selected={selectedSuite}
                                    onSelectSuite={setSelectedSuite}
                                    onDeleteSuite={() => setSelectedSuite(null)}
                                    refreshFlag={sidebarRefreshFlag}
                                    collapsed={sidebarCollapsed}
                                />
                                <div style={{ flex: 1, overflow: 'auto' }}>
                                    <TestCaseView suite={selectedSuite} projectId={projectId} />
                                </div>
                            </>
                        }
                    />
                    <Route
                        path="suites"
                        element={
                            <TestSuiteSidebar
                                projectId={projectId}
                                selected={selectedSuite}
                                onSelectSuite={setSelectedSuite}
                                onDeleteSuite={() => setSelectedSuite(null)}
                                refreshFlag={sidebarRefreshFlag}
                                collapsed={sidebarCollapsed}
                            />
                        }
                    />
                    <Route
                        path="test-runs"
                        element={<TestRunsView />}
                    />
                    {/* Redirect to "cases" by default */}
                    <Route index element={<Navigate to="cases" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default ProjectPage;
