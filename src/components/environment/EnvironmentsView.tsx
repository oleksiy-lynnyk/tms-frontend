// src/components/environment/EnvironmentsView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    fetchEnvironments,
    createEnvironment,
    deleteEnvironment,
} from '../../api/environmentApi';
import type { EnvironmentDTO } from '../../types';
import EnvironmentModal from './EnvironmentModal';
import EnvironmentTable from './EnvironmentTable';
import EntityToolbar from '../common/EntityToolbar';

const EnvironmentsView: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [environments, setEnvironments] = useState<EnvironmentDTO[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState<Partial<EnvironmentDTO>>({ title: '', description: '' });

    const [page, setPage] = useState(0);
    const pageSize = 10;

    const load = async () => {
        if (!projectId) return;
        const data = await fetchEnvironments(projectId);
        setEnvironments(data);
    };

    const handleSave = async (env: Partial<EnvironmentDTO>) => {
        if (!projectId || !env.title) return;
        await createEnvironment({ ...env, projectId });
        await load();
        setShowModal(false);
        setForm({ title: '', description: '' });
    };

    const handleEdit = (env: EnvironmentDTO) => {
        setForm(env);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        await deleteEnvironment(id);
        await load();
    };

    useEffect(() => {
        load();
    }, [projectId]);

    const total = environments.length;
    const totalPages = Math.ceil(total / pageSize);
    const pagedItems = environments.slice(page * pageSize, (page + 1) * pageSize);

    return (
        <div className="p-3 w-100">
            <EntityToolbar title="Environments" onAdd={() => setShowModal(true)} addButtonLabel="+ Add Environment" />

            <EnvironmentTable
                items={pagedItems}
                onDelete={handleDelete}
                onEdit={handleEdit}
                page={page}
                pageSize={pageSize}
                total={total}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            <EnvironmentModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
                form={form}
                setForm={setForm}
            />
        </div>
    );
};

export default EnvironmentsView;