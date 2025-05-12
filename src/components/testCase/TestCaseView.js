// src/components/testCase/TestCaseView.js

import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import TestCaseHeader      from './TestCaseHeader';
import TestCaseTable       from './TestCaseTable';
import EditTestCaseModal   from './EditTestCaseModal';
import AddTestCaseModal    from './AddTestCaseModal';
import DeleteConfirmModal  from './DeleteConfirmModal';
import { getPaginatedCases, deleteTestCase } from '../../api/testCaseApi';

const defaultColumns = {
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
};

const TestCaseView = ({ suite }) => {
    // стани
    const [testCases, setTestCases] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const pageSize = 25;           // константа, а не стан
    const [sortField, setSortField] = useState('id');
    const [sortDir, setSortDir]     = useState('desc');
    const [search, setSearch]       = useState('');
    const [debounced, setDebounced] = useState(search);
    const [visibleCols, setVisibleCols] = useState(() => {
        const raw = localStorage.getItem('visibleColumns');
        return raw ? JSON.parse(raw) : defaultColumns;
    });

    // модалки
    const [sel, setSel]         = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd]   = useState(false);
    const [showDel, setShowDel]   = useState(false);

    // debounce пошуку
    useEffect(() => {
        const t = setTimeout(() => {
            setDebounced(search);
            setPage(0);
        }, 300);
        return () => clearTimeout(t);
    }, [search]);

    // фетч даних
    useEffect(() => {
        if (!suite?.id) {
            setTestCases([]);
            return;
        }
        const fetchCases = async () => {
            try {
                const res = await getPaginatedCases(
                    suite.id,
                    page,
                    pageSize,
                    sortField,
                    sortDir,
                    debounced
                );
                setTestCases(res.data.content);
                setTotalPages(res.data.totalPages);
            } catch (e) {
                console.error('Fetch failed:', e);
            }
        };
        fetchCases();
    }, [suite?.id, page, sortField, sortDir, debounced]);

    const handleSort = field => {
        if (field === sortField) {
            setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDir('asc');
        }
        setPage(0);
    };

    const confirmDelete = async () => {
        if (!sel) return;
        await deleteTestCase(sel.id);
        setShowDel(false);
        setSel(null);
        setPage(0);
    };

    return (
        <div className="d-flex flex-column p-3" style={{ height: '100%' }}>
            {/* 1) шапка поза скролом */}
            <TestCaseHeader
                suiteName={suite?.name}
                search={search}
                onSearch={setSearch}
                onAdd={() => setShowAdd(true)}
                visibleColumns={visibleCols}
                onToggleColumn={key => {
                    const upd = { ...visibleCols, [key]: !visibleCols[key] };
                    setVisibleCols(upd);
                    localStorage.setItem('visibleColumns', JSON.stringify(upd));
                }}
                onSort={handleSort}
                sortField={sortField}
                sortDir={sortDir}
                totalCases={totalPages * pageSize} // наприклад, для загального лічильника
            />

            {/* 2) тільки ця зона скролиться */}
            <div style={{ overflowY: 'auto', flexGrow: 1 }}>
                <TestCaseTable
                    testCases={testCases}
                    visibleColumns={visibleCols}
                    sortColumn={sortField}
                    sortDirection={sortDir}
                    onSort={handleSort}
                    onEdit={tc => { setSel(tc); setShowEdit(true); }}
                    onDelete={tc => { setSel(tc); setShowDel(true); }}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>

            {/* 3) модалки */}
            <EditTestCaseModal
                show={showEdit}
                testCase={sel}
                onClose={() => setShowEdit(false)}
                onSave={() => setPage(0)}
            />
            <AddTestCaseModal
                show={showAdd}
                suiteId={suite?.id}
                onClose={() => setShowAdd(false)}
                onSave={() => setPage(0)}
            />
            <DeleteConfirmModal
                show={showDel}
                testCase={sel}
                onClose={() => setShowDel(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default TestCaseView;
