// src/components/configuration/ConfigurationsView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConfigurationModal from './ConfigurationModal';
import ConfigurationTable from './ConfigurationTable';
import EntityToolbar from '../common/EntityToolbar';
import {
    fetchConfigurations,
    createConfiguration,
    deleteConfiguration
} from '../../api/configurationApi';
import type { ConfigurationDTO } from '../../types';

const ConfigurationsView: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [items, setItems] = useState<ConfigurationDTO[]>([]);
    const [form, setForm] = useState<Partial<ConfigurationDTO>>({
        title: '',
        slug: '',
        description: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const loadItems = async () => {
        if (!projectId) return;
        const data = await fetchConfigurations(projectId);
        setItems(data);
    };

    const handleSave = async (data: Partial<ConfigurationDTO>) => {
        if (!projectId || !data.title || !data.slug) return;
        await createConfiguration({ ...data, projectId });
        await loadItems();
        setShowModal(false);
        setForm({ title: '', slug: '', description: '' });
    };

    const handleDelete = async (id: string) => {
        await deleteConfiguration(id);
        await loadItems();
    };

    const handleEdit = (item: ConfigurationDTO) => {
        setForm(item);
        setShowModal(true);
    };

    useEffect(() => {
        loadItems();
    }, [projectId]);

    const filtered = items.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
    const totalPages = Math.ceil(filtered.length / pageSize);

    return (
        <div className="p-3 w-100 d-flex flex-column h-100">
            <EntityToolbar
                title="Configurations"
                onAdd={() => {
                    setForm({ title: '', slug: '', description: '' });
                    setShowModal(true);
                }}
                onSearch={setSearchQuery}
                searchPlaceholder="Search configurations..."
                addButtonLabel="+ Add Configuration"
            />

            <ConfigurationTable
                items={paged}
                onDelete={handleDelete}
                onEdit={handleEdit}
                page={page}
                pageSize={pageSize}
                total={filtered.length}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            <ConfigurationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
                form={form}
                setForm={setForm}
            />
        </div>
    );
};

export default ConfigurationsView;
