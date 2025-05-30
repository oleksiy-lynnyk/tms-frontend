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

    if (!projectId) return <Navigate to="/projects" replace />;

    return (
        <div className="d-flex" style={{ height: '100vh', minWidth: 0 }}>
            {/* Sidebar */}
            <ProjectMenu />
            {/* Сьют-дерево */}
            <FoldersTreeSidebar
                projectId={projectId}
                selected={selectedSuite}
                onSelectSuite={setSelectedSuite}
                onDeleteSuite={() => setSelectedSuite(null)}
                refreshFlag={0}
                collapsed={false}
            />
            {/* Контент для кейсів/ранів */}
            <div style={{
                flexGrow: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                background: '#fff'
            }}>
                <Routes>
                    <Route
                        path="cases"
                        element={
                            <TestCaseView
                                suite={selectedSuite}
                                projectId={projectId}
                            />
                        }
                    />
                    <Route path="test-runs" element={<TestRunsView />} />
                    <Route index element={<Navigate to="cases" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default ProjectPage;
