// src/entities/configuration/views/ConfigurationsView.tsx
import React, { useEffect, useState } from 'react';
import GenericEntityTable from '../../../components/common/GenericEntityTable';
import PageHeader from '../../../components/common/PageHeader';
import ConfigurationModal from '../components/ConfigurationModal';
import { fetchConfigurations, deleteConfiguration, createConfiguration, updateConfiguration } from '../../configuration/api/configurationApi';
import type { ConfigurationDTO } from '../../configuration/types/configurationTypes';
import type { ColumnDefinition } from '../../../types/ColumnDefinition';

const PAGE_SIZE_OPTIONS = [10, 25, 50];
const columnsConf: ColumnDefinition<ConfigurationDTO>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'slug', label: 'Slug', sortable: true },
    { key: 'description', label: 'Description', sortable: false },
];

const ConfigurationsView: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [allItems, setAllItems] = useState<ConfigurationDTO[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState<ConfigurationDTO | undefined>();
    const [form, setForm] = useState<Partial<ConfigurationDTO>>({ projectId });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await fetchConfigurations(projectId);
            setAllItems(data);
            setTotal(data.length);
            setPage(0);
        })();
    }, [projectId]);

    useEffect(() => {
        setForm(editItem ?? { projectId });
    }, [editItem, projectId]);

    const filtered = allItems.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.slug.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const handleSave = async () => {
        if (!form) return;
        setIsSaving(true);
        try {
            if (form.id) {
                await updateConfiguration(form.id, form as ConfigurationDTO);
            } else {
                const { id, ...payload } = form;
                await createConfiguration(payload as Omit<ConfigurationDTO, 'id'>);
            }
            setShowModal(false);
            const data = await fetchConfigurations(projectId);
            setAllItems(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ padding: 16 }}>
            <PageHeader
                title="Configurations"
                searchValue={search}
                onSearchChange={setSearch}
                onAdd={() => { setEditItem(undefined); setShowModal(true); }}
            />

            <GenericEntityTable<ConfigurationDTO>
                columns={columnsConf}
                items={filtered.slice(page * pageSize, (page + 1) * pageSize)}
                currentPage={page}
                pageSize={pageSize}
                totalElements={total}
                totalPages={totalPages}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={setPage}
                onPageSizeChange={size => { setPageSize(size); setPage(0); }}
                onEdit={c => { setEditItem(c); setShowModal(true); }}
                onDelete={async id => {
                    await deleteConfiguration(id);
                    const data = await fetchConfigurations(projectId);
                    setAllItems(data);
                }}
            />

            {showModal && (
                <ConfigurationModal
                    show={showModal}
                    config={editItem!}
                    form={form}
                    setForm={setForm}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    isSaving={isSaving}
                />
            )}
        </div>
    );
};

export default ConfigurationsView;