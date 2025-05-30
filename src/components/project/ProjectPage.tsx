import React, { useState } from 'react';
import { useParams, Routes, Route, Navigate } from 'react-router-dom';
import ProjectMenu from './ProjectMenu';
import FoldersTreeSidebar from '../testSuite/FoldersTreeSidebar';
import TestCaseView from '../testCase/TestCaseView';
import TestRunsView from '../testRun/TestRunsView';
import type { TestSuiteDTO } from '../../types';

const ProjectPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();

    const [selectedSuite, setSelectedSuite] = useState<TestSuiteDTO | null>(null);
    const [sidebarRefreshFlag, setSidebarRefreshFlag] = useState(0);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    if (!projectId) {
        return <Navigate to="/projects" replace />;
    }

    return (
        <div className="app-container">
            <ProjectMenu />
            <div className="content-container">
                <Routes>
                    <Route
                        path="cases"
                        element={
                            <div style={{ display: 'flex', flex: 1, minHeight: 0, minWidth: 0 }}>
                                <FoldersTreeSidebar
                                    projectId={projectId}
                                    selected={selectedSuite}
                                    onSelectSuite={setSelectedSuite}
                                    onDeleteSuite={() => setSelectedSuite(null)}
                                    refreshFlag={sidebarRefreshFlag}
                                    collapsed={sidebarCollapsed}
                                />
                                {/* Контейнер для кейсів */}
                                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                                    <TestCaseView suite={selectedSuite} projectId={projectId} />
                                </div>
                            </div>
                        }
                    />
                    <Route
                        path="suites"
                        element={
                            <FoldersTreeSidebar
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
                    <Route index element={<Navigate to="cases" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default ProjectPage;
