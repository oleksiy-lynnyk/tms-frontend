import React, { useEffect, useState } from 'react';
import { fetchSuitesTree } from '../../testSuite/api/testSuiteApi';
import { fetchCasesBySuite, createCase, updateCase, deleteCase } from '../../testCase/api/testCaseApi';
import type { TestSuiteDTO } from '../../testSuite/types/testSuiteTypes';
import type { TestCaseDTO } from '../../testCase/types/testCaseTypes';
import PageHeader from '../../../components/common/PageHeader';
import GenericEntityTable from '../../../components/common/GenericEntityTable';
import FoldersTreeSidebar from '../../testSuite/components/FoldersTreeSidebar';
import TestCaseModal from '../../testCase/components/TestCaseModal';
import type { ColumnDefinition } from '../../../types/ColumnDefinition';

type Props = {
    projectId: string;
};

const SuiteCaseView: React.FC<Props> = ({ projectId }) => {
    const [selectedSuiteId, setSelectedSuiteId] = useState<string | null>(null);
    const [cases, setCases] = useState<TestCaseDTO[]>([]);
    const [loadingCases, setLoadingCases] = useState(false);
    const [search, setSearch] = useState('');

    // Стан для модального вікна
    const [showModal, setShowModal] = useState(false);
    const [editingCase, setEditingCase] = useState<TestCaseDTO | undefined>();

    useEffect(() => {
        if (selectedSuiteId) {
            loadCases(selectedSuiteId);
        } else {
            setCases([]);
        }
    }, [selectedSuiteId]);

    const loadCases = async (suiteId: string) => {
        setLoadingCases(true);
        try {
            const data = await fetchCasesBySuite(suiteId);
            setCases(data.content);
        } catch (error) {
            console.error('Error loading cases:', error);
        } finally {
            setLoadingCases(false);
        }
    };

    const filteredCases = cases.filter(tc =>
        (tc.title?.toLowerCase() ?? '').includes(search.toLowerCase())
    );

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

            // Перезавантажити список тест-кейсів
            if (selectedSuiteId) {
                await loadCases(selectedSuiteId);
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

            // Перезавантажити список
            if (selectedSuiteId) {
                await loadCases(selectedSuiteId);
            }
        } catch (error) {
            console.error('Error deleting test case:', error);
            window.alert('Error deleting test case');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: 250, borderRight: '1px solid #ddd' }}>
                <FoldersTreeSidebar
                    projectId={projectId}
                    selectedSuite={selectedSuiteId}
                    onSelectSuite={setSelectedSuiteId}
                />
            </div>
            <div style={{ flex: 1, padding: 16 }}>
                <PageHeader
                    title="Test Cases"
                    searchValue={search}
                    onSearchChange={setSearch}
                    onAdd={handleAddClick} // ← Виправлено!
                />

                <GenericEntityTable
                    columns={columns}
                    items={filteredCases}
                    currentPage={0}
                    pageSize={filteredCases.length}
                    totalElements={filteredCases.length}
                    totalPages={1}
                    onPageChange={() => {}}
                    onPageSizeChange={() => {}}
                    onEdit={handleEditClick} // ← Виправлено!
                    onDelete={handleDelete} // ← Виправлено!
                />
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
        </div>
    );
};

export default SuiteCaseView;