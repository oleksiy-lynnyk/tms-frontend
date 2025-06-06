import React, { useState, useEffect, useCallback } from 'react';
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
import PageHeader from '../common/PageHeader';

function TestRunsView() {
    const { projectId } = useParams<{ projectId: string }>();
    const [runs, setRuns] = useState<TestRunDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalRun, setModalRun] = useState<Partial<TestRunDTO> | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');

    const fetchRuns = useCallback(async () => {
        setLoading(true);
        try {
            if (!projectId) return;
            const resp = await getRunsByProject(projectId, { page: 0, size: 50, sort: 'startedAt,desc' });
            setRuns(resp.data.content);
        } catch (err) {
            console.error('FETCH RUNS ERROR:', err);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchRuns();
    }, [projectId, fetchRuns]);

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

    // Простий фільтр (можеш замінити на пошук на бекенді)
    const filteredRuns = runs.filter(run =>
        run.name?.toLowerCase().includes(search.toLowerCase()) ||
        (run.code && run.code.toLowerCase().includes(search.toLowerCase()))
    );


    return (
        <div>
            <PageHeader
                title="Тест-рани"
                onSearch={setSearch}
                searchPlaceholder="Пошук тест-рана..."
                addButtonLabel="Додати тест-ран"
                onAdd={() => { setModalRun(undefined); setShowModal(true); }}
            />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <TestRunTable
                    runs={filteredRuns}
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
