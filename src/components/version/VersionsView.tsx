// src/components/version/VersionsView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EntityToolbar from '../common/EntityToolbar';
import VersionModal from './VersionModal';
import VersionTable from './VersionTable';
import {
    fetchVersions,
    createVersion,
    deleteVersion,
} from '../../api/versionApi';
import type { VersionDTO } from '../../types';

const VersionsView: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [versions, setVersions] = useState<VersionDTO[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState<Partial<VersionDTO>>({
        title: '',
        slug: '',
        description: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const loadVersions = async () => {
        if (!projectId) return;
        const data = await fetchVersions(projectId);
        setVersions(data);
    };

    const handleSave = async (formData: Partial<VersionDTO>) => {
        if (!projectId || !formData.title || !formData.slug) return;
        await createVersion({ ...formData, projectId });
        await loadVersions();
        setShowModal(false);
        setForm({ title: '', slug: '', description: '' });
    };

    const handleDelete = async (id: string) => {
        await deleteVersion(id);
        await loadVersions();
    };

    const handleEdit = (version: VersionDTO) => {
        setForm(version);
        setShowModal(true);
    };

    useEffect(() => {
        loadVersions();
    }, [projectId]);

    const filteredVersions = versions.filter(v =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pagedVersions = filteredVersions.slice(page * pageSize, (page + 1) * pageSize);
    const totalPages = Math.ceil(filteredVersions.length / pageSize);

    return (
        <div className="p-3 w-100 d-flex flex-column h-100">
            <EntityToolbar
                title="Versions"
                onAdd={() => {
                    setForm({ title: '', slug: '', description: '' });
                    setShowModal(true);
                }}
                onSearch={setSearchQuery}
                searchPlaceholder="Пошук версій..."
                addButtonLabel="+ Add Version"
            />

            <VersionTable
                items={pagedVersions}
                onDelete={handleDelete}
                onEdit={handleEdit}
                page={page}
                pageSize={pageSize}
                total={filteredVersions.length}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            <VersionModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
                form={form}
                setForm={setForm}
            />
        </div>
    );
};

export default VersionsView;
