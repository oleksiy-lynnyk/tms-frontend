// src/components/testRun/TestRunsView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EntityToolbar from '../common/EntityToolbar';
import TestRunModal from './TestRunModal';
import TestRunTable from './TestRunTable';
import {
    getRunsByProject,
    createRun,
    deleteRun,
} from '../../api/testRunApi';
import type { TestRunDTO, Page } from '../../types';

const TestRunsView: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [items, setItems] = useState<TestRunDTO[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Partial<TestRunDTO>>({
        name: '',
        description: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const loadData = async () => {
        if (!projectId) return;
        const response = await getRunsByProject(projectId);
        setItems(response.data.content || []);
    };

    const handleSave = async (data: Partial<TestRunDTO>) => {
        if (!projectId || !data.name) return;
        await createRun({ ...data, projectId });
        await loadData();
        setShowModal(false);
        setFormData({ name: '', description: '' });
    };

    const handleDelete = async (id: string) => {
        await deleteRun(id);
        await loadData();
    };

    const handleEdit = (run: TestRunDTO) => {
        setFormData(run);
        setShowModal(true);
    };

    useEffect(() => {
        loadData();
    }, [projectId]);

    const filtered = items.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (i.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
    const totalPages = Math.ceil(filtered.length / pageSize);

    return (
        <div className="p-3 w-100 d-flex flex-column h-100">
            <EntityToolbar
                title="Test Runs"
                onAdd={() => {
                    setFormData({ name: '', description: '' });
                    setShowModal(true);
                }}
                onSearch={setSearchQuery}
                searchPlaceholder="Пошук тестових прогонів..."
                addButtonLabel="+ Add Run"
            />

            <TestRunTable
                items={paged}
                onDelete={handleDelete}
                onEdit={handleEdit}
                page={page}
                pageSize={pageSize}
                total={filtered.length}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            <TestRunModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
};

export default TestRunsView;
