import React from 'react'
import { Table, Button } from 'react-bootstrap'
import type { TestCaseDTO, ColumnKey } from '../../types'
import TableFooter from '../common/TableFooter'

interface Props {
    testCases: TestCaseDTO[]
    visibleColumns: Record<ColumnKey, boolean>
    selectedIds: Set<string>
    onToggleSelect: (id: string) => void
    onSelectAll: (checked: boolean) => void
    onEdit: (tc: TestCaseDTO) => void
    onDelete: (tc: TestCaseDTO) => void
    onSort: (field: ColumnKey) => void
    sortField: keyof TestCaseDTO
    sortDir: 'asc' | 'desc'
    page: number
    pageSize: number
    total: number
    totalPages: number
    onPageChange: (p: number) => void
}

const COLUMN_DEFS: Array<{ key: ColumnKey; label: string }> = [
    { key: 'select', label: '' },
    { key: 'code', label: 'Code' },
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'Priority' },
    { key: 'owner', label: 'Owner' },
    { key: 'tags', label: 'Tags' },
    { key: 'state', label: 'State' },
    { key: 'type', label: 'Type' },
    { key: 'automationStatus', label: 'Automation' },
    { key: 'component', label: 'Component' },
    { key: 'requirement', label: 'Requirement' },
    { key: 'preconditions', label: 'Preconditions' },
    { key: 'description', label: 'Description' },
    { key: 'steps', label: 'Steps' },
    { key: 'expectedResult', label: 'Expected Result' },
    { key: 'useCase', label: 'Use Case' },
    { key: 'suiteId', label: 'Suite ID' },
]

const TestCaseTable: React.FC<Props> = ({
                                            testCases,
                                            visibleColumns,
                                            selectedIds,
                                            onToggleSelect,
                                            onSelectAll,
                                            onEdit,
                                            onDelete,
                                            onSort,
                                            sortField,
                                            sortDir,
                                            page,
                                            pageSize,
                                            total,
                                            totalPages,
                                            onPageChange
                                        }) => {
    const allSelected = testCases.length > 0 && testCases.every(tc => selectedIds.has(tc.id))

    const renderSortArrow = (key: keyof TestCaseDTO) =>
        sortField === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

    const startItem = total > 0 ? page * pageSize + 1 : 0
    const endItem = Math.min((page + 1) * pageSize, total)

    return (
        <div className="d-flex flex-column h-100">
            <Table hover size="sm" className="table-bordered mb-0 table">
                <thead>
                <tr>
                    {COLUMN_DEFS.map(col => {
                        if (!visibleColumns[col.key]) return null

                        if (col.key === 'select') {
                            return (
                                <th key="select" style={{ width: '1%', textAlign: 'center' }}>
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={e => onSelectAll(e.target.checked)}
                                    />
                                </th>
                            )
                        }

                        return (
                            <th
                                key={col.key}
                                style={{ cursor: 'pointer' }}
                                onClick={() => onSort(col.key)}
                            >
                                {col.label}
                                {renderSortArrow(col.key as keyof TestCaseDTO)}
                            </th>
                        )
                    })}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {testCases.map(c => (
                    <tr key={c.id}>
                        {COLUMN_DEFS.map(col => {
                            if (!visibleColumns[col.key]) return null

                            if (col.key === 'select') {
                                return (
                                    <td key="select" style={{ textAlign: 'center' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.has(c.id)}
                                            onChange={() => onToggleSelect(c.id)}
                                        />
                                    </td>
                                )
                            }
                            // value для кожної колонки
                            const val = c[col.key as keyof TestCaseDTO] ?? '-';
                            return <td key={col.key}>{String(val)}</td>
                        })}

                        <td>
                            <Button size="sm" variant="outline-primary" onClick={() => onEdit(c)}>
                                Edit
                            </Button>{' '}
                            <Button size="sm" variant="outline-danger" onClick={() => onDelete(c)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}

                {testCases.length === 0 && (
                    <tr>
                        <td colSpan={COLUMN_DEFS.filter(c => visibleColumns[c.key]).length + 1} className="text-center text-muted">
                            No test cases found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
            <TableFooter
                startItem={startItem}
                endItem={endItem}
                total={total}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    )
}

export default TestCaseTable
