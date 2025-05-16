// src/components/testCase/TestCaseView.tsx
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'react-bootstrap'
import TestCaseHeader from './TestCaseHeader'
import TestCaseTable from './TestCaseTable'
import AddTestCaseModal from './AddTestCaseModal'
import EditTestCaseModal from './EditTestCaseModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import BulkEditTestCaseModal from './BulkEditTestCaseModal'
import CopyTestCaseModal from './CopyTestCaseModal'
import MoveTestCaseModal from './MoveTestCaseModal'
import AppPagination from '../common/Pagination'
import type { TestCase, ColumnKey } from './types'
import {
    getPaginatedCases,
    deleteTestCase,
    updateTestCase,
    createTestCase,
    } from '../../api/testCaseApi'

// Видимі колонки таблиці
type VisibleColumns = Record<ColumnKey, boolean>
const defaultColumns: VisibleColumns = {
    select: true,
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
    preconditions: false,
    description: false,
    steps: false,
    expectedResult: false,
    useCase: false,
    suiteId: false,
}

interface Props {
    suite: { id: number; name: string } | null
}

const TestCaseView: React.FC<Props> = ({ suite }) => {
    // хуки мають викликатися на одному рівні
    const [cases, setCases] = useState<TestCase[]>([])
    const [search, setSearch] = useState('')
    const [sortField, setSortField] = useState<keyof TestCase>('id')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
    const [visibleCols, setVisibleCols] = useState<VisibleColumns>(defaultColumns)
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

    // модалки
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDel, setShowDel] = useState(false)
    const [showBulkEdit, setShowBulkEdit] = useState(false)
    const [showBulkCopy, setShowBulkCopy] = useState(false)
    const [showBulkMove, setShowBulkMove] = useState(false)
    const [showBulkDelete, setShowBulkDelete] = useState(false)
    const [currentCase, setCurrentCase] = useState<TestCase | null>(null)

    // пагінація
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize] = useState(25)
    const [totalPages, setTotalPages] = useState(0)
    const [totalElements, setTotalElements] = useState(0)

    // завантаження даних
    const fetchCases = useCallback(async () => {
        if (!suite) return
        const res = await getPaginatedCases(
            suite.id,
            currentPage,
            pageSize,
            sortField,
            sortDir,
            search
        )
        setCases(res.data.content)
        if (typeof res.data.totalElements === 'number') {
            setTotalElements(res.data.totalElements)
            setTotalPages(Math.ceil(res.data.totalElements / pageSize))
        } else if (typeof res.data.totalPages === 'number') {
            setTotalPages(res.data.totalPages)
        }
        setSelectedIds(new Set())
    }, [suite, currentPage, pageSize, sortField, sortDir, search])

    useEffect(() => {
        void fetchCases()
    }, [fetchCases])

    // якщо suite не обране — рано виходимо
    if (!suite) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100%' }}
            >
                <p className="text-muted">
                    Оберіть Test Suite, щоб побачити тест-кейси
                </p>
            </div>
        )
    }

    // селект/демаркація
    const toggleSelect = (id: number) =>
        setSelectedIds(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    const toggleSelectAll = (checked: boolean) =>
        setSelectedIds(checked ? new Set(cases.map(c => c.id)) : new Set())

    // сортування
    const handleSort = (field: keyof TestCase) => {
        if (field === sortField) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
        else {
            setSortField(field)
            setSortDir('asc')
        }
    }

    // CRUD-хендлери
    const handleAddSave = async () => {
        setShowAdd(false)
        await fetchCases()
    }
    const handleEdit = (tc: TestCase) => {
        setCurrentCase(tc)
        setShowEdit(true)
    }
    const handleDelConfirm = (tc: TestCase) => {
        setCurrentCase(tc)
        setShowDel(true)
    }
    const handleDelete = async () => {
        if (!currentCase) return
        await deleteTestCase(currentCase.id)
        setShowDel(false)
        await fetchCases()
    }

    // bulk save
    const handleBulkSave = async (updates: Partial<TestCase>) => {
        const payload: Partial<TestCase> = { ...updates, suiteId: suite.id }
        await Promise.all(
            Array.from(selectedIds).map(id => updateTestCase(id, payload))
        )
        setShowBulkEdit(false)
        await fetchCases()
    }
    const handleBulkDelete = async () => {
        await Promise.all(
            Array.from(selectedIds).map(id => deleteTestCase(id))
        )
        setShowBulkDelete(false)
        await fetchCases()
    }
    const handleBulkCopy = async (targetSuiteId: number) => {
            // Дублюємо кожен кейс: беремо існуючий та створюємо новий із новим suiteId
                await Promise.all(
                      Array.from(selectedIds).map(async id => {
                            const original = cases.find(c => c.id === id)
                                if (original) {
                                  const { id: _, ...data } = original
                                  await createTestCase({ ...data, suiteId: targetSuiteId })
                                }
                          })
                    )
        setShowBulkCopy(false)
        await fetchCases()
    }
    const handleBulkMove = async (targetSuiteId: number) => {
        await Promise.all(
            Array.from(selectedIds).map(id =>
                updateTestCase(id, { suiteId: targetSuiteId })
            )
        )
        setShowBulkMove(false)
        await fetchCases()
    }

    // обчислення діапазону результатів
    const startItem = totalElements > 0 ? currentPage * pageSize + 1 : 0
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements)

    return (
        <div className="d-flex flex-column p-3" style={{ height: '100%' }}>
            {/* Header */}
            <TestCaseHeader
                suiteName={suite.name}
                search={search}
                onSearch={setSearch}
                onAdd={() => setShowAdd(true)}
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

            {/* Table */}
            <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                <TestCaseTable
                    testCases={cases}
                    visibleColumns={visibleCols}
                    selectedIds={selectedIds}
                    onToggleSelect={toggleSelect}
                    onSelectAll={toggleSelectAll}
                    onEdit={handleEdit}
                    onDelete={handleDelConfirm}
                    onSort={handleSort}
                    sortField={sortField}
                    sortDir={sortDir}
                />
            </div>

            {/* Показ результатів */}
            <div className="mt-2 text-center text-muted">
                {`Showing ${startItem} to ${endItem} of ${totalElements} results`}
            </div>

            {/* Pagination */}
            <AppPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Modals */}
            <AddTestCaseModal
                show={showAdd}
                onClose={() => setShowAdd(false)}
                suiteId={suite.id}
                onSave={handleAddSave}
            />
            <EditTestCaseModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                onSave={handleAddSave}
                testCase={currentCase}
                suiteId={suite.id}
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
            />
            <MoveTestCaseModal
                show={showBulkMove}
                onClose={() => setShowBulkMove(false)}
                onMove={handleBulkMove}
                selectedCount={selectedIds.size}
            />
            <DeleteConfirmModal
                show={showBulkDelete}
                onClose={() => setShowBulkDelete(false)}
                onConfirm={handleBulkDelete}
                title="Delete Test Cases"
                body={`Are you sure you want to delete ${selectedIds.size} test case${selectedIds.size > 1 ? 's' : ''}? This action cannot be undone.`}
            />
        </div>
    )
}

export default TestCaseView
