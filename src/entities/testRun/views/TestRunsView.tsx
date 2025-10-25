// src/entities/testRun/views/TestRunsView.tsx
import React, { useEffect, useState } from 'react';
import GenericEntityTable from '../../../components/common/GenericEntityTable';
import PageHeader from '../../../components/common/PageHeader';
import { TestRunDTO, CreateTestRunDTO } from '../../testRun/types/testRunTypes';
import { fetchTestRuns, createTestRun, deleteTestRun, updateTestRun } from '../../testRun/api/testRunApi';
import TestRunModal from '../components/TestRunModal';
import type { ColumnDefinition } from '../../../types/ColumnDefinition';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

const columns: ColumnDefinition<TestRunDTO>[] = [
    { key: 'name',        label: 'Name'        },
    { key: 'status',      label: 'Status'      },
    { key: 'description', label: 'Description' },
];

const TestRunsView: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [items, setItems]         = useState<TestRunDTO[]>([]);
    const [page, setPage]           = useState(0);
    const [pageSize, setPageSize]   = useState(PAGE_SIZE_OPTIONS[0]);
    const [total, setTotal]         = useState(0);
    const [search, setSearch]       = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editRun, setEditRun]     = useState<TestRunDTO | undefined>();
    const [isSaving, setIsSaving]   = useState(false);

    const load = async () => {
        const res = await fetchTestRuns(projectId, page, pageSize);
        setItems(res.content);
        setTotal(res.totalElements);
    };

    useEffect(() => { load(); }, [projectId, page, pageSize]);

    const filtered = items.filter(run =>
        (run.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (run.status ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (run.description ?? '').toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

    const handleSave = async (data: Partial<TestRunDTO>) => {
        setIsSaving(true);
        try {
            if (data.id) {
                await updateTestRun(data.id, data as TestRunDTO);
            } else {
                const payload: CreateTestRunDTO = {
                    projectId,
                    name:            data.name || '',
                    description:     data.description || '',
                    status:          data.status  || '',
                    code:            data.code    || '',
                    assignedTo:      data.assignedTo,
                    configurationId: data.configurationId,
                    environmentId:   data.environmentId,
                };
                await createTestRun(payload);
            }
            setShowModal(false);
            await load();
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ padding: 16 }}>
            <PageHeader
                title="Test Runs"
                searchValue={search}
                onSearchChange={setSearch}
                onAdd={() => { setEditRun(undefined); setShowModal(true); }}
            />

            <GenericEntityTable<TestRunDTO>
                columns={columns}
                items={filtered.slice(page * pageSize, (page + 1) * pageSize)}
                currentPage={page}
                pageSize={pageSize}
                totalElements={filtered.length}
                totalPages={totalPages}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={setPage}
                onPageSizeChange={size => { setPageSize(size); setPage(0); }}
                onEdit={item => { setEditRun(item); setShowModal(true); }}
                onDelete={async id => { await deleteTestRun(id); await load(); }}
            />

            {showModal && (
                <TestRunModal
                    show={showModal}
                    testRun={editRun}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    isSaving={isSaving}
                />
            )}
        </div>
    );
};

export default TestRunsView;
