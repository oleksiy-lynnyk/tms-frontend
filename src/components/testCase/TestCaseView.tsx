import React, { useState, useEffect, useCallback } from 'react';
import TestCaseToolbar from './TestCaseToolbar';
import TestCaseTable from './TestCaseTable';
import AddTestCaseModal from './AddTestCaseModal';
import EditTestCaseModal from './EditTestCaseModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import BulkEditTestCaseModal from './BulkEditTestCaseModal';
import CopyTestCaseModal from './CopyTestCaseModal';
import MoveTestCaseModal from './MoveTestCaseModal';
import ImportTestCasesModal from './ImportTestCasesModal';
import AppPagination from '../common/Pagination';
import type { TestCaseDTO } from '../../types';
import type { ColumnKey } from '../../types';

import {
    fetchCasesBySuite,
    deleteCase,
    updateCase,
    createCase,
} from '../../api/testCaseApi';

type VisibleColumns = Record<ColumnKey, boolean>;
const defaultColumns: VisibleColumns = {
    select: false,
    id: true,
    title: true,
    priority: true,
    owner: true,
    tags: true,
    state: true,
    type: true,
    automationStatus: true,
    component: true,
    requirement: true,
    projectId: false,
    preconditions: false,
    description: false,
    steps: false,
    expectedResult: false,
    useCase: false,
    suiteId: false,
};

interface Props {
    suite: { id: string; name: string } | null;
    projectId: string;
}

const TestCaseView: React.FC<Props> = ({ suite, projectId }) => {
    const [cases, setCases] = useState<TestCaseDTO[]>([]);
    const [search, setSearch] = useState('');
    const [visibleCols, setVisibleCols] = useState<VisibleColumns>(defaultColumns);
    const [sortField, setSortField] = useState<ColumnKey>('id');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 25;
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [showBulkEdit, setShowBulkEdit] = useState(false);
    const [showBulkCopy, setShowBulkCopy] = useState(false);
    const [showBulkMove, setShowBulkMove] = useState(false);
    const [showBulkDelete, setShowBulkDelete] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [currentCase, setCurrentCase] = useState<TestCaseDTO | null>(null);

    // Fetch cases only if suite is selected
    const fetchCases = useCallback(async () => {
        if (!suite) {
            setCases([]);
            setTotalElements(0);
            setTotalPages(0);
            return;
        }
        const pageResp = await fetchCasesBySuite(
            suite.id,
            search,
            currentPage,
            pageSize
        );
        setCases(pageResp.content);
        setTotalElements(pageResp.totalElements);
        setTotalPages(pageResp.totalPages);
        setSelectedIds(new Set());
    }, [suite, currentPage, search]);

    useEffect(() => {
        void fetchCases();
    }, [fetchCases]);

    // Sorting
    const handleSort = (field: ColumnKey) => {
        if (field === 'select') return;
        if (field === sortField) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDir('asc');
        }
        setCurrentPage(0);
        void fetchCases();
    };

    // Selection
    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const toggleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? new Set(cases.map((c) => c.id)) : new Set());
    };

    // CRUD
    const handleAddSave = async () => {
        setShowAdd(false);
        await fetchCases();
    };
    const handleEditClick = (tc: TestCaseDTO) => {
        setCurrentCase(tc);
        setShowEdit(true);
    };
    const handleDeleteConfirm = (tc: TestCaseDTO) => {
        setCurrentCase(tc);
        setShowDel(true);
    };
    const handleDelete = async () => {
        if (!currentCase) return;
        await deleteCase(currentCase.id);
        setShowDel(false);
        await fetchCases();
    };

    // Bulk Edit
    const handleBulkSave = async (
        updates: Partial<Omit<TestCaseDTO, 'id'>>
    ) => {
        await Promise.all(
            Array.from(selectedIds).map((id) => {
                const orig = cases.find((c) => c.id === id);
                if (!orig) return Promise.resolve();
                const fullUpdate: Omit<TestCaseDTO, 'id'> = {
                    ...orig,
                    ...updates,
                    title: updates.title ?? orig.title ?? '',
                    projectId: updates.projectId ?? orig.projectId ?? '',
                    suiteId: updates.suiteId ?? orig.suiteId ?? '',
                };
                return updateCase(id, fullUpdate);
            })
        );
        setShowBulkEdit(false);
        await fetchCases();
    };

    const handleBulkDelete = async () => {
        await Promise.all(Array.from(selectedIds).map((id) => deleteCase(id)));
        setShowBulkDelete(false);
        await fetchCases();
    };
    const handleBulkCopy = async (targetSuiteId: string) => {
        await Promise.all(
            Array.from(selectedIds).map(async (id) => {
                const orig = cases.find((c) => c.id === id);
                if (orig) {
                    const { id: _, ...data } = orig;
                    await createCase({
                        ...data,
                        suiteId: targetSuiteId,
                        projectId: orig.projectId,
                    });
                }
            })
        );
        setShowBulkCopy(false);
        await fetchCases();
    };
    const handleBulkMove = async (targetSuiteId: string) => {
        await Promise.all(
            Array.from(selectedIds).map((id) => {
                const orig = cases.find((c) => c.id === id);
                if (!orig) return Promise.resolve();
                const fullUpdate: Omit<TestCaseDTO, 'id'> = {
                    ...orig,
                    suiteId: targetSuiteId,
                    title: orig.title ?? '',
                    projectId: orig.projectId ?? '',
                };
                return updateCase(id, fullUpdate);
            })
        );
        setShowBulkMove(false);
        await fetchCases();
    };

    // Pagination
    const startItem = totalElements > 0 ? currentPage * pageSize + 1 : 0;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    return (
        <div className="d-flex flex-column h-100" style={{ width: '100%', minWidth: 0 }}>
            {/* --- Тулбар завжди видимий --- */}
            <TestCaseToolbar
                search={search}
                onSearch={setSearch}
                onAdd={() => setShowAdd(true)}
                onImportCsv={() => setShowImport(true)}
                anySelected={selectedIds.size > 0}
                onBulkEdit={() => setShowBulkEdit(true)}
                onBulkCopy={() => setShowBulkCopy(true)}
                onBulkMove={() => setShowBulkMove(true)}
                onBulkDelete={() => setShowBulkDelete(true)}
                visibleColumns={visibleCols}
                onToggleColumn={k =>
                    setVisibleCols(cols => ({ ...cols, [k]: !cols[k] }))
                }
                
            />

            <div style={{ flexGrow: 1, width: '100%', overflowY: 'auto', minWidth: 0 }}>
                <TestCaseTable
                    testCases={cases}
                    visibleColumns={visibleCols}
                    selectedIds={selectedIds}
                    onToggleSelect={toggleSelect}
                    onSelectAll={toggleSelectAll}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteConfirm}
                    onSort={handleSort}
                    sortField={sortField === 'select' ? 'id' : sortField}
                    sortDir={sortDir}
                />
            </div>

            <div className="mt-2 text-center text-muted">
                {`Showing ${startItem} to ${endItem} of ${totalElements} results`}
            </div>

            <AppPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Модалки для CRUD — все як було */}
            <AddTestCaseModal
                show={showAdd}
                onClose={() => setShowAdd(false)}
                suiteId={suite?.id ?? ''}
                projectId={projectId}
                onSave={handleAddSave}
            />
            <EditTestCaseModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                onSave={handleAddSave}
                testCase={currentCase}
                suiteId={suite?.id ?? ''}
            />
            <DeleteConfirmModal
                show={showDel}
                onClose={() => setShowDel(false)}
                onConfirm={handleDelete}
                itemName={currentCase?.title}
            />
            <BulkEditTestCaseModal
                show={showBulkEdit}
                onClose={() => setShowBulkEdit(false)}
                onSave={handleBulkSave}
                selectedIds={selectedIds}
            />
            <CopyTestCaseModal
                show={showBulkCopy}
                onClose={() => setShowBulkCopy(false)}
                onCopy={handleBulkCopy}
                selectedCount={selectedIds.size}
                projectId={projectId}
            />
            <MoveTestCaseModal
                show={showBulkMove}
                onClose={() => setShowBulkMove(false)}
                onMove={handleBulkMove}
                selectedCount={selectedIds.size}
                projectId={projectId}
            />
            <DeleteConfirmModal
                show={showBulkDelete}
                onClose={() => setShowBulkDelete(false)}
                onConfirm={handleBulkDelete}
                title="Delete Test Cases"
                body={`Are you sure you want to delete ${selectedIds.size} test case${selectedIds.size > 1 ? 's' : ''}? This action cannot be undone.`}
            />
            <ImportTestCasesModal
                show={showImport}
                onClose={() => setShowImport(false)}
                onImported={fetchCases}
                suiteId={suite?.id ?? ''}
            />
        </div>
    );
};

export default TestCaseView;
