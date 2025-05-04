import React, { useEffect, useState } from 'react';
import { getAllSuites, removeTestCaseFromSuite } from '../../api/testSuiteApi';
import EditTestCaseModal from './EditTestCaseModal';
import AddTestCaseModal from './AddTestCaseModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const defaultColumns = {
    title: true,
    description: true,
    steps: true,
    expectedResult: true,
    priority: true,
    tags: true,
};

const SuiteCaseView = ({ suite }) => {
    const [currentSuite, setCurrentSuite] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [caseToDelete, setCaseToDelete] = useState(null);

    const [sortColumn, setSortColumn] = useState(() => localStorage.getItem('sortColumn') || 'id');
    const [sortDirection, setSortDirection] = useState(() => localStorage.getItem('sortDirection') || 'desc');

    const [visibleColumns, setVisibleColumns] = useState(() => {
        const saved = localStorage.getItem('visibleColumns');
        return saved ? JSON.parse(saved) : defaultColumns;
    });

    useEffect(() => {
        if (suite) setCurrentSuite(suite);
    }, [suite]);

    const refreshSuite = async () => {
        const all = await getAllSuites();
        const updated = all.data.find(s => s.id === suite?.id);
        console.log("🔁 Refreshed suite:", updated); // <== Додай
        if (updated) setCurrentSuite(updated);
    };

    const openEditModal = (tc) => {
        console.log('OPEN EDIT MODAL', tc); // <== ДОДАЙ ЦЕ
        setSelectedCase(tc);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (caseToDelete) {
            await removeTestCaseFromSuite(currentSuite.id, caseToDelete.id);
            setShowDeleteModal(false);
            setCaseToDelete(null);
            refreshSuite();
        }
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            const newDir = sortDirection === 'asc' ? 'desc' : 'asc';
            setSortDirection(newDir);
            localStorage.setItem('sortDirection', newDir);
        } else {
            setSortColumn(column);
            setSortDirection('asc');
            localStorage.setItem('sortColumn', column);
            localStorage.setItem('sortDirection', 'asc');
        }
    };

    const renderSortArrow = (column) => {
        if (sortColumn !== column) return '';
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };

    const sortedCases = [...(currentSuite?.testCases || [])].sort((a, b) => {
        if (!sortColumn) return 0;
        const aVal = a[sortColumn] ?? '';
        const bVal = b[sortColumn] ?? '';
        if (sortColumn === 'id') {
            return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        return sortDirection === 'asc'
            ? String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
            : String(bVal).localeCompare(String(aVal), undefined, { numeric: true });
    });

    if (!currentSuite) {
        return <div className="p-3 text-muted">Select a test suite to view its cases.</div>;
    }

    return (
        <div className="p-3 flex-grow-1">
            <h4>{currentSuite.name}</h4>
            <p>{currentSuite.description}</p>

            {/* Column Manager */}
            <div className="mb-3">
                <button
                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    🧩 Manage Columns
                </button>
                <ul className="dropdown-menu p-2 border">
                    {Object.keys(defaultColumns).map(key => (
                        <li key={key} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`col-${key}`}
                                checked={visibleColumns[key]}
                                onChange={() => {
                                    const updated = { ...visibleColumns, [key]: !visibleColumns[key] };
                                    setVisibleColumns(updated);
                                    localStorage.setItem('visibleColumns', JSON.stringify(updated));
                                }}
                            />
                            <label className="form-check-label ms-2" htmlFor={`col-${key}`}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <button className="btn btn-success mb-3" onClick={() => setShowAddModal(true)}>
                + Add Test Case
            </button>

            <h6>Test Cases:</h6>
            {sortedCases.length ? (
                <table className="table table-bordered table-sm align-middle">
                    <thead>
                    <tr>
                        <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                            ID{renderSortArrow('id')}
                        </th>
                        {visibleColumns.title && (
                            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                                Title{renderSortArrow('title')}
                            </th>
                        )}
                        {visibleColumns.description && (
                            <th onClick={() => handleSort('description')} style={{ cursor: 'pointer' }}>
                                Description{renderSortArrow('description')}
                            </th>
                        )}
                        {visibleColumns.steps && (
                            <th onClick={() => handleSort('steps')} style={{ cursor: 'pointer' }}>
                                Steps{renderSortArrow('steps')}
                            </th>
                        )}
                        {visibleColumns.expectedResult && (
                            <th onClick={() => handleSort('expectedResult')} style={{ cursor: 'pointer' }}>
                                Expected Result{renderSortArrow('expectedResult')}
                            </th>
                        )}
                        {visibleColumns.priority && (
                            <th onClick={() => handleSort('priority')} style={{ cursor: 'pointer' }}>
                                Priority{renderSortArrow('priority')}
                            </th>
                        )}
                        {visibleColumns.tags && (
                            <th onClick={() => handleSort('tags')} style={{ cursor: 'pointer' }}>
                                Tags{renderSortArrow('tags')}
                            </th>
                        )}
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedCases.map(tc => (
                        <tr key={tc.id}>
                            <td>TC-{tc.id}</td>
                            {visibleColumns.title && <td>{tc.title || '-'}</td>}
                            {visibleColumns.description && <td>{tc.description || '-'}</td>}
                            {visibleColumns.steps && <td style={{ whiteSpace: 'pre-wrap' }}>{tc.steps || '-'}</td>}
                            {visibleColumns.expectedResult && <td>{tc.expectedResult || '-'}</td>}
                            {visibleColumns.priority && <td>{tc.priority || '-'}</td>}
                            {visibleColumns.tags && <td>{tc.tags || '-'}</td>}
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => openEditModal(tc)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                        setCaseToDelete(tc);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-muted">No test cases in this suite yet.</p>
            )}

            <EditTestCaseModal
                show={showModal}
                onClose={() => setShowModal(false)}
                testCase={selectedCase}
                onSave={refreshSuite}
            />

            <AddTestCaseModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                suiteId={currentSuite.id}
                onSave={refreshSuite}
            />

            <DeleteConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                testCase={caseToDelete}
            />
        </div>
    );
};

export default SuiteCaseView;
