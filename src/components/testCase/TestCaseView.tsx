// src/components/testCase/TestCaseView.tsx
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

    // Завантаження сторінки
    const fetchCases = useCallback(async () => {
        if (!suite) return;
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

    // Сортування — виключаємо "select"
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

    if (!suite) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100%' }}
            >
                <p className="text-muted">Select a Test Suite to view cases</p>
            </div>
        );
    }

    // Виділення
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

    // CRUD, Bulk, Pagination, etc. (як у тебе)

    const startItem = totalElements > 0 ? currentPage * pageSize + 1 : 0;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    const handleEditClick = (tc: TestCaseDTO) => {
        setCurrentCase(tc);
        setShowEdit(true);
    };

    const handleDeleteConfirm = (tc: TestCaseDTO) => {
        setCurrentCase(tc);
        setShowDel(true);
    };

    return (
        <div className="main-content-panel">
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

            <div style={{ flexGrow: 1, overflowY: 'auto' }}>
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

            {/* Модалки — залишаєш як є */}
            {/* ... */}
        </div>
    );
};

export default TestCaseView;
