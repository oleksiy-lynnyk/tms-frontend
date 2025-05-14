// src/components/testCase/TestCaseView.tsx

import React, { useEffect, useState } from 'react';
import TestCaseHeader from './TestCaseHeader';
import TestCaseTable from './TestCaseTable';
import BulkEditTestCaseModal from './BulkEditTestCaseModal';
import AddTestCaseModal from './AddTestCaseModal';
import EditTestCaseModal from './EditTestCaseModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { getPaginatedCases, deleteTestCase, updateTestCase } from '../../api/testCaseApi';
import type { TestCase } from './types';

const defaultColumns: Record<string, boolean> = {
    select: true, id: true, title: true,
    priority: true, owner: true, tags: true,
    state: true, type: true, automationStatus: true,
    component: true, requirement: true,
    preconditions: false, description: false,
    steps: false, expectedResult: false,
    useCase: false,
};

interface TestCaseViewProps {
    suite: { id: number; name: string } | null;
}

const TestCaseView: React.FC<TestCaseViewProps> = ({ suite }) => {
    // ─── ВСІ ХУКИ НА САМЕ ПОЧАТКУ ─────────────────────────────────────────
    const [cases, setCases] = useState<TestCase[]>([]);
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState<keyof TestCase>('id');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const [visibleCols, setVisibleCols] = useState(defaultColumns);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [showBulk, setShowBulk] = useState(false);
    const [currentCase, setCurrentCase] = useState<TestCase | null>(null);

    // ─── ФУНКЦІЯ ФЕТЧУ ──────────────────────────────────────────────────────
    const fetchCases = async () => {
        if (!suite) {
            setCases([]);
            setSelectedIds(new Set());
            return;
        }
        const res = await getPaginatedCases(
            suite.id,
            0,      // поки що без пагінації
            25,
            sortField,
            sortDir,
            search
        );
        setCases(res.data.content);
        setSelectedIds(new Set()); // скидати виділення на новому наборі
    };

    // ─── EFFECT ДЛЯ ЗАПУСКУ ФЕТЧУ ─────────────────────────────────────────
    useEffect(() => {
        fetchCases();
    }, [suite?.id, sortField, sortDir, search]);

    // ─── ХЕНДЛЕРИ ──────────────────────────────────────────────────────────
    const toggleSelect = (id: number) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const toggleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? new Set(cases.map(c => c.id)) : new Set());
    };

    const handleSort = (field: keyof TestCase) => {
        if (field === sortField) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
        else {
            setSortField(field);
            setSortDir('asc');
        }
    };

    const handleDelete = async () => {
        if (!currentCase) return;
        await deleteTestCase(currentCase.id);
        setShowDel(false);
        fetchCases();
    };

    const handleEdit = (tc: TestCase) => {
        setCurrentCase(tc);
        setShowEdit(true);
    };
    const handleDelConfirm = (tc: TestCase) => {
        setCurrentCase(tc);
        setShowDel(true);
    };

    // ─── РАННІЙ RETURN ДЛЯ НЕОБРАНОГО SUITE ───────────────────────────────
    if (!suite) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <h5 className="text-muted">Please select a Test Suite</h5>
            </div>
        );
    }

    // ─── ОСНОВНИЙ UI ───────────────────────────────────────────────────────
    return (
        <div className="d-flex flex-column p-3" style={{ height: '100%' }}>
            <TestCaseHeader
                suiteName={suite.name}
                search={search}
                onSearch={setSearch}
                onAdd={() => setShowAdd(true)}
                anySelected={selectedIds.size > 0}
                allOnPageSelected={cases.length > 0 && cases.every(c => selectedIds.has(c.id))}
                onSelectAll={toggleSelectAll}
                onBulkEdit={() => setShowBulk(true)}
                visibleColumns={visibleCols}
                onToggleColumn={key => setVisibleCols(v => ({ ...v, [key]: !v[key] }))}
                onSort={handleSort}
                sortField={sortField}
                sortDir={sortDir}
            />

            <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                <TestCaseTable
                    testCases={cases}
                    selectedIds={selectedIds}
                    onToggleSelect={toggleSelect}
                    onSelectAll={toggleSelectAll}
                    onEdit={handleEdit}
                    onDelete={handleDelConfirm}
                />
            </div>

            <AddTestCaseModal
                show={showAdd}
                onClose={() => setShowAdd(false)}
                suiteId={suite.id}
                onSave={() => { setShowAdd(false); fetchCases(); }}
            />

            <EditTestCaseModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                onSave={() => { setShowEdit(false); fetchCases(); }}
                testCase={currentCase}
                suiteId={suite.id}
            />

            <DeleteConfirmModal
                show={showDel}
                onClose={() => setShowDel(false)}
                onConfirm={handleDelete}
            />

            <BulkEditTestCaseModal
                show={showBulk}
                onClose={() => setShowBulk(false)}
                selectedIds={selectedIds}
                onSave={async updates => {
                    const dto = { ...updates, suiteId: suite.id };
                    await Promise.all(
                        Array.from(selectedIds).map(id =>
                            updateTestCase(id, dto)
                        )
                    );
                    setShowBulk(false);
                    fetchCases();
                }}
            />
        </div>
    );
};

export default TestCaseView;
