// src/entities/version/views/VersionsView.tsx

import React, { useEffect, useState } from 'react';
import PageHeader from '../../../components/common/PageHeader';
import GenericEntityTable, { ColumnDefinition } from '../../../components/common/GenericEntityTable';
import VersionModal from '../components/VersionModal';
import {
    fetchVersions,
    createVersion,
    updateVersion,
    deleteVersion,
} from '../api/versionApi';
import type { VersionDTO } from '../types/versionTypes';

const PAGE_SIZE_OPTIONS = [10, 20, 50];
const columns: ColumnDefinition<VersionDTO>[] = [
    { key: 'title',       label: 'Version',     sortable: true },
    { key: 'slug',        label: 'Slug',        sortable: true },
    { key: 'description', label: 'Description', sortable: true },
];

const VersionsView: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [allItems,      setAllItems]      = useState<VersionDTO[]>([]);
    const [page,          setPage]          = useState<number>(0);
    const [pageSize,      setPageSize]      = useState<number>(PAGE_SIZE_OPTIONS[0]);
    const [editItem,      setEditItem]      = useState<VersionDTO | undefined>(undefined);
    const [form,          setForm]          = useState<Partial<VersionDTO>>({ projectId });
    const [showModal,     setShowModal]     = useState<boolean>(false);
    const [isSaving,      setIsSaving]      = useState<boolean>(false);
    const [search,        setSearch]        = useState<string>('');

    // load all versions
    const load = async () => {
        const data = await fetchVersions(projectId);
        setAllItems(data);
        setPage(0);
    };

    useEffect(() => { load(); }, [projectId]);

    // filtered and paginated items
    // filtered and paginated items
    const filtered = allItems.filter(v =>
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.slug.toLowerCase().includes(search.toLowerCase()) ||
        (v.description ?? '').toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const displayItems = filtered.slice(page * pageSize, (page + 1) * pageSize);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (form.id) {
                await updateVersion(form.id, form as VersionDTO);
            } else {
                await createVersion({
                    projectId,
                    title:       form.title       || '',
                    slug:        form.slug        || '',
                    description: form.description || '',
                });
            }
            setShowModal(false);
            await load();
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <PageHeader
                title="Versions"
                searchValue={search}
                onSearchChange={setSearch}
                onAdd={() => {
                    setForm({ projectId });
                    setEditItem(undefined);
                    setShowModal(true);
                }}
            />

            <GenericEntityTable<VersionDTO>
                columns={columns}
                items={displayItems}
                currentPage={page}
                pageSize={pageSize}
                totalElements={filtered.length}
                totalPages={totalPages}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={setPage}
                onPageSizeChange={size => { setPageSize(size); setPage(0); }}
                onEdit={item => { setEditItem(item); setForm(item); setShowModal(true); }}
                onDelete={async id => { await deleteVersion(id); await load(); }}
            />

            {showModal && (
                <VersionModal
                    show={showModal}
                    version={editItem}
                    form={form}
                    setForm={setForm}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    isSaving={isSaving}
                />
            )}
        </>
    );
};

export default VersionsView;
