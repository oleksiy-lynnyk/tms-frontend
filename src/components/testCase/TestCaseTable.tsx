import React, { FC } from 'react'
import { Table, Button } from 'react-bootstrap'
import type { TestCase, ColumnKey } from '../../types'

interface Props {
    testCases: TestCase[]
    visibleColumns: Record<ColumnKey, boolean>
    selectedIds: Set<string>
    onToggleSelect: (id: string) => void
    onSelectAll: (checked: boolean) => void
    onEdit: (tc: TestCase) => void
    onDelete: (tc: TestCase) => void
    onSort: (field: ColumnKey) => void
    sortField: keyof TestCase
    sortDir: 'asc' | 'desc'
}

const COLUMN_DEFS: Array<{ key: ColumnKey; label: string }> = [
    { key: 'select', label: '' },
    { key: 'code', label: 'Code' }, // ← id видалено!
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

const TestCaseTable: FC<Props> = ({
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
                                  }) => {
    const allSelected = testCases.length > 0 && testCases.every(tc => selectedIds.has(tc.id))

    const renderSortArrow = (key: keyof TestCase) =>
        sortField === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

    return (
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
                            {renderSortArrow(col.key as keyof TestCase)}
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
                        const val = c[col.key as keyof TestCase] ?? '-';
                        return <td key={col.key}>{val}</td>
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
    )
}

export default TestCaseTable
