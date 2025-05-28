import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    getRunsByProject,
    createRun,
    updateRun,
    deleteRun,
    cloneRun,
} from '../../api/testRunApi';
import type { TestRunDTO } from '../../types';
import TestRunTable from './TestRunTable';
import TestRunModal from './TestRunModal';
import { Button } from 'react-bootstrap';

function TestRunsView() {
    const { id: projectId } = useParams<{ id: string }>();
    const [runs, setRuns] = useState<TestRunDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalRun, setModalRun] = useState<Partial<TestRunDTO> | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);

    const fetchRuns = async () => {
        setLoading(true);
        try {
            if (!projectId) return;
            const resp = await getRunsByProject(projectId);
            setRuns(resp.data.content);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRuns();
        // eslint-disable-next-line
    }, [projectId]);

    const handleSave = async (dto: Partial<TestRunDTO>) => {
        if (!projectId) return;
        if (dto.id) {
            await updateRun(dto.id, dto);
        } else {
            await createRun({ ...dto, projectId });
        }
        setShowModal(false);
        await fetchRuns();
    };

    const handleDelete = async (run: TestRunDTO) => {
        await deleteRun(run.id);
        await fetchRuns();
    };

    const handleClone = async (run: TestRunDTO) => {
        await cloneRun(run.id);
        await fetchRuns();
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h2>Test Runs</h2>
                <Button onClick={() => { setModalRun(undefined); setShowModal(true); }}>
                    + New Test Run
                </Button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <TestRunTable
                    runs={runs}
                    onEdit={run => { setModalRun(run); setShowModal(true); }}
                    onDelete={handleDelete}
                    onClone={handleClone}
                    onView={run => {
                        // тут можна відкрити модалку перегляду чи навідати інший роут
                        console.log('View details for run', run.id);
                    }}
                />
            )}

            <TestRunModal
                show={showModal}
                run={modalRun}
                onSave={handleSave}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}

export default TestRunsView;
