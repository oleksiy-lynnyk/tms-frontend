import React, { useEffect, useState } from 'react';

import { Table, Form } from 'react-bootstrap';
import { fetchSuitesTree } from '../../testSuite/api/testSuiteApi';
import { fetchCasesBySuite, createCase, updateCase, deleteCase, bulkUpdateCases } from '../../testCase/api/testCaseApi';
import type { TestSuiteDTO } from '../../testSuite/types/testSuiteTypes';
import type { TestCaseDTO } from '../../testCase/types/testCaseTypes';
import FoldersTreeSidebar from '../../testSuite/components/FoldersTreeSidebar';
import TestCaseModal from '../../testCase/components/TestCaseModal';
import TestCaseToolbar from '../../testCase/components/TestCaseToolbar';
import BulkEditTestCaseModal from '../../testCase/components/BulkEditTestCaseModal';
import CopyTestCaseModal from '../../testCase/components/CopyTestCaseModal';
import MoveTestCaseModal from '../../testCase/components/MoveTestCaseModal';
import DeleteConfirmModal from '../../testCase/components/DeleteConfirmModal';
import ImportTestCasesModal from '../../testCase/components/ImportTestCasesModal';
import ManageColumnsModal from '../../testCase/components/ManageColumnsModal';
import TablePaginationFooter from '../../../components/common/TablePaginationFooter';
import type { ColumnDefinition } from '../../../types/ColumnDefinition';

type Props = {
    projectId: string;
};

const SuiteCaseView: React.FC<Props> = ({ projectId }) => {
    const [selectedSuiteId, setSelectedSuiteId] = useState<string | null>(null);
    const [cases, setCases] = useState<TestCaseDTO[]>([]);
    const [loadingCases, setLoadingCases] = useState(false);
    const [search, setSearch] = useState('');

    // Стан для пагінації
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Стан для модального вікна створення/редагування
    const [showModal, setShowModal] = useState(false);
    const [editingCase, setEditingCase] = useState<TestCaseDTO | undefined>();

    // Стан для вибору тест-кейсів (чекбокси)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Стан для модалок bulk операцій
    const [showBulkEdit, setShowBulkEdit] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showMove, setShowMove] = useState(false);
    const [showBulkDelete, setShowBulkDelete] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [showManageColumns, setShowManageColumns] = useState(false);

    // Стан для управління колонками
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
        code: true,
        title: true,
        priority: true,
        state: true,
        type: true,
    });

    const toggleColumn = (key: string) => {
        setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const resetColumns = () => {
        setVisibleColumns({
            code: true,
            title: true,
            priority: true,
            state: true,
            type: true,
        });
    };

    // Скинути пагінацію при зміні suite
    useEffect(() => {
        setCurrentPage(0);
        setSelectedIds(new Set());
    }, [selectedSuiteId]);

    useEffect(() => {
        if (selectedSuiteId) {
            loadCases(selectedSuiteId, currentPage, pageSize, search);
        } else {
            setCases([]);
            setTotalElements(0);
            setTotalPages(0);
        }
    }, [selectedSuiteId, currentPage, pageSize, search]);

    const loadCases = async (suiteId: string, page: number = 0, size: number = 20, searchTerm: string = '') => {
        setLoadingCases(true);
        try {
            const data = await fetchCasesBySuite(suiteId, page, size, searchTerm);
            setCases(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error loading cases:', error);
        } finally {
            setLoadingCases(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSelectedIds(new Set()); // Скинути вибір при зміні сторінки
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(0); // Повернутися на першу сторінку
        setSelectedIds(new Set()); // Скинути вибір
    };

    const columns: ColumnDefinition<TestCaseDTO>[] = [
        { key: 'code', label: 'Code' },
        { key: 'title', label: 'Title' },
        { key: 'priority', label: 'Priority' },
        { key: 'state', label: 'State' },
        { key: 'type', label: 'Type' }
    ];

    // Відкрити модальне вікно для створення нового тест-кейсу
    const handleAddClick = () => {
        if (!selectedSuiteId) {
            window.alert('Please select a test suite first');
            return;
        }

        console.log('Open add test case modal'); // Debug log (можна залишити)
        setEditingCase(undefined);
        setShowModal(true);
    };

    // Відкрити модальне вікно для редагування
    const handleEditClick = (testCase: TestCaseDTO) => {
        setEditingCase(testCase);
        setShowModal(true);
    };

    // Зберегти тест-кейс (створити або оновити)
    const handleSave = async (data: Partial<TestCaseDTO>) => {
        try {
            if (editingCase) {
                // Оновлення існуючого тест-кейсу
                await updateCase(editingCase.id!, data as any);
            } else {
                // Створення нового тест-кейсу
                const newCaseData = {
                    ...data,
                    suiteId: selectedSuiteId!,
                    projectId: projectId
                };
                await createCase(newCaseData as any);
            }

            setShowModal(false);

            // Перезавантажити список тест-кейсів з поточними параметрами
            if (selectedSuiteId) {
                await loadCases(selectedSuiteId, currentPage, pageSize, search);
            }
        } catch (error) {
            console.error('Error saving test case:', error);
            throw error; // Перекинути помилку для обробки в модалі
        }
    };

    // Видалити тест-кейс
    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this test case?')) {
            return;
        }

        try {
            await deleteCase(id);

            // Перезавантажити список з поточними параметрами
            if (selectedSuiteId) {
                await loadCases(selectedSuiteId, currentPage, pageSize, search);
            }
        } catch (error) {
            console.error('Error deleting test case:', error);
            window.alert('Error deleting test case');
        }
    };

    // === BULK ОПЕРАЦІЇ ===
    // Вибір/зняття вибору тест-кейса
    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    // Вибрати всі / зняти всі (тільки на поточній сторінці)
    const toggleSelectAll = () => {
        if (selectedIds.size === cases.length && cases.length > 0) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(cases.map(tc => tc.id)));
        }
    };

    // Bulk Edit
    const handleBulkEdit = async (updates: Partial<TestCaseDTO>) => {
        try {
            await bulkUpdateCases({
                ids: Array.from(selectedIds),
                operations: Object.entries(updates).reduce((acc, [key, value]) => {
                    acc[key] = { type: value === undefined ? 'CLEAR' : 'SET', value: value as string };
                    return acc;
                }, {} as any)
            });
            setSelectedIds(new Set());
            if (selectedSuiteId) await loadCases(selectedSuiteId, currentPage, pageSize, search);
        } catch (error) {
            console.error('Bulk edit error:', error);
            alert('Error updating test cases');
        }
    };

    // Bulk Copy
    const handleBulkCopy = async (targetSuiteId: string) => {
        try {
            await bulkUpdateCases({
                ids: Array.from(selectedIds),
                copyToSuiteId: targetSuiteId
            });
            setSelectedIds(new Set());
            if (selectedSuiteId) await loadCases(selectedSuiteId, currentPage, pageSize, search);
            alert('Test cases copied successfully');
        } catch (error) {
            console.error('Bulk copy error:', error);
            alert('Error copying test cases');
        }
    };

    // Bulk Move
    const handleBulkMove = async (targetSuiteId: string) => {
        try {
            await bulkUpdateCases({
                ids: Array.from(selectedIds),
                moveToSuiteId: targetSuiteId
            });
            setSelectedIds(new Set());
            if (selectedSuiteId) await loadCases(selectedSuiteId, currentPage, pageSize, search);
            alert('Test cases moved successfully');
        } catch (error) {
            console.error('Bulk move error:', error);
            alert('Error moving test cases');
        }
    };

    // Bulk Delete
    const handleBulkDelete = async () => {
        try {
            await bulkUpdateCases({
                ids: Array.from(selectedIds),
                delete: true
            });
            setSelectedIds(new Set());
            if (selectedSuiteId) await loadCases(selectedSuiteId, currentPage, pageSize, search);
        } catch (error) {
            console.error('Bulk delete error:', error);
            alert('Error deleting test cases');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <div style={{ width: 250, borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column' }}>
                <FoldersTreeSidebar
                    projectId={projectId}
                    selectedSuite={selectedSuiteId}
                    onSelectSuite={setSelectedSuiteId}
                />
            </div>
            <div className="entity-container" style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <TestCaseToolbar
                    search={search}
                    onSearch={setSearch}
                    onAdd={handleAddClick}
                    onImportCsv={() => setShowImport(true)}
                    anySelected={selectedIds.size > 0}
                    onBulkEdit={() => setShowBulkEdit(true)}
                    onBulkCopy={() => setShowCopy(true)}
                    onBulkMove={() => setShowMove(true)}
                    onBulkDelete={() => setShowBulkDelete(true)}
                    onShowManageColumns={() => setShowManageColumns(true)}
                />

                {/* Wrapper для таблиці та пагінації */}
                <div className="generic-table-container">
                    <div className="table-wrapper">
                        {/* Кастомна таблиця з чекбоксами */}
                        <Table className="table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        <Form.Check
                                            type="checkbox"
                                            checked={selectedIds.size === cases.length && cases.length > 0}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    {columns.map(col => (
                                        <th key={col.key as string}>{col.label}</th>
                                    ))}
                                    <th className="actions-column">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length + 2} className="text-center no-data">
                                            <span>No test cases</span>
                                        </td>
                                    </tr>
                                ) : (
                                    cases.map(tc => (
                                        <tr key={tc.id}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedIds.has(tc.id)}
                                                    onChange={() => toggleSelect(tc.id)}
                                                />
                                            </td>
                                            {columns.map(col => {
                                                const value = tc[col.key];
                                                // Обробка масивів (steps) та інших складних типів
                                                const displayValue = Array.isArray(value)
                                                    ? `${value.length} steps`
                                                    : (value ?? '');
                                                return (
                                                    <td key={col.key as string}>
                                                        {displayValue}
                                                    </td>
                                                );
                                            })}
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => handleEditClick(tc)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDelete(tc.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {/* Футер пагінації */}
                    <TablePaginationFooter
                        currentPage={currentPage}
                        pageSize={pageSize}
                        pageSizeOptions={[10, 20, 50, 100]}
                        totalElements={totalElements}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        startItem={currentPage * pageSize}
                        endItem={Math.min((currentPage + 1) * pageSize, totalElements)}
                    />
                </div>
            </div>

            {/* Модальне вікно для створення/редагування тест-кейсів */}
            {showModal && selectedSuiteId && (
                <TestCaseModal
                    show={showModal}
                    testCase={editingCase}
                    suiteId={selectedSuiteId}
                    projectId={projectId}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}

            {/* Bulk Edit Modal */}
            <BulkEditTestCaseModal
                show={showBulkEdit}
                onClose={() => setShowBulkEdit(false)}
                onSave={handleBulkEdit}
                selectedIds={selectedIds}
            />

            {/* Copy Modal */}
            <CopyTestCaseModal
                show={showCopy}
                onClose={() => setShowCopy(false)}
                onCopy={handleBulkCopy}
                selectedCount={selectedIds.size}
                projectId={projectId}
            />

            {/* Move Modal */}
            <MoveTestCaseModal
                show={showMove}
                onClose={() => setShowMove(false)}
                onMove={handleBulkMove}
                selectedCount={selectedIds.size}
                projectId={projectId}
            />

            {/* Bulk Delete Modal */}
            <DeleteConfirmModal
                show={showBulkDelete}
                onClose={() => setShowBulkDelete(false)}
                onConfirm={handleBulkDelete}
                title="Delete Test Cases"
                body={`Are you sure you want to delete ${selectedIds.size} test case(s)?`}
            />

            {/* Import CSV Modal */}
            {showImport && selectedSuiteId && (
                <ImportTestCasesModal
                    show={showImport}
                    onClose={() => setShowImport(false)}
                    suiteId={selectedSuiteId}
                    onImported={() => {
                        setShowImport(false);
                        if (selectedSuiteId) loadCases(selectedSuiteId, currentPage, pageSize, search);
                    }}
                />
            )}

            {/* Manage Columns Modal */}
            <ManageColumnsModal
                show={showManageColumns}
                onClose={() => setShowManageColumns(false)}
                columns={visibleColumns}
                onToggle={toggleColumn}
                onReset={resetColumns}
            />
        </div>
    );
};

export default SuiteCaseView;
