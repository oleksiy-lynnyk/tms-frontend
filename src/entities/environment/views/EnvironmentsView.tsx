// src/entities/environment/views/EnvironmentsView.tsx
import React, { useEffect, useState } from 'react';
import GenericEntityTable from '../../../components/common/GenericEntityTable';
import PageHeader from '../../../components/common/PageHeader';
import EnvironmentModal from '../components/EnvironmentModal';

import type { EnvironmentDTO } from '../types/environmentTypes';
import { fetchEnvironmentsPaged, deleteEnvironment, createEnvironment, updateEnvironment } from '../api/environmentApi';
import type { ColumnDefinition } from '../../../types/ColumnDefinition';

const PAGE_SIZE_OPTIONS = [10, 25, 50];
const columnsEnv: ColumnDefinition<EnvironmentDTO>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'host', label: 'Host', sortable: true },
    { key: 'port', label: 'Port', sortable: true },
];

interface EnvironmentsViewProps {
    projectId: string;
}

const EnvironmentsView: React.FC<EnvironmentsViewProps> = ({ projectId }) => {
    const [items, setItems] = useState<EnvironmentDTO[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState<EnvironmentDTO | undefined>(undefined);
    const [form, setForm] = useState<Omit<EnvironmentDTO, 'id'>>({
        projectId: projectId,
        name: '',
        slug: '',
        description: '',
        host: '',
        port: 0
    });

    const load = async () => {
        try {
            const data = await fetchEnvironmentsPaged(projectId, search, page, pageSize);
            setItems(data.content || []);
            setTotalElements(data.totalElements || 0);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { load(); }, [projectId, page, pageSize, search]);

    const openNew = () => {
        setForm({
            projectId: projectId, // ← ДОДАНО projectId!
            name: '',
            slug: '',
            description: '',
            host: '',
            port: 0
        });
        setEditItem(undefined);
        setShowModal(true);
    };

    const openEdit = (item: EnvironmentDTO) => {
        setForm({
            projectId: item.projectId, // ← ДОДАНО projectId!
            name: item.name,
            slug: item.slug || '',
            description: item.description || '',
            host: item.host || '',
            port: item.port || 0
        });
        setEditItem(item);
        setShowModal(true);
    };

    const handleSave = async (data: Omit<EnvironmentDTO, 'id'>) => {
        try {
            // Переконатись, що projectId встановлено
            const environmentData = {
                ...data,
                projectId: projectId // ← Гарантуємо правильний projectId!
            };

            if (editItem) {
                await updateEnvironment(editItem.id, environmentData);
            } else {
                await createEnvironment(environmentData);
            }
            setShowModal(false);
            await load();
        } catch (err) {
            console.error('Error saving environment:', err);
        }
    };

    return (
        <div style={{ padding: 16 }}>
            <PageHeader
                title="Environments"
                searchValue={search}
                onSearchChange={setSearch}
                onAdd={openNew}
            />

            <GenericEntityTable<EnvironmentDTO>
                columns={columnsEnv}
                items={items}
                currentPage={page}
                pageSize={pageSize}
                totalElements={totalElements}
                totalPages={totalPages}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={setPage}
                onPageSizeChange={size => { setPageSize(size); setPage(0); }}
                onEdit={openEdit}
                onDelete={async id => { await deleteEnvironment(id); load(); }}
            />

            {showModal && (
                <EnvironmentModal
                    show={showModal}
                    environment={editItem}
                    form={form}
                    setForm={setForm}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default EnvironmentsView;