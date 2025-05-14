import React, { FC } from 'react'
import {
    Row,
    Col,
    InputGroup,
    Form,
    Button,
    DropdownButton,
} from 'react-bootstrap'
import type { TestCase, ColumnKey } from './types'

export interface TestCaseHeaderProps {
    suiteName?: string
    search: string
    onSearch: (value: string) => void
    onAdd: () => void

    anySelected: boolean
    allOnPageSelected: boolean
    onSelectAll: (checked: boolean) => void
    onBulkEdit: () => void

    visibleColumns: Record<ColumnKey, boolean>
    onToggleColumn: (key: ColumnKey) => void

    onSort: (field: keyof TestCase) => void
    sortField: keyof TestCase
    sortDir: 'asc' | 'desc'
}

const COLUMN_DEFS: { key: ColumnKey; label: string }[] = [
    { key: 'select', label: '' },
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'Priority' },
    { key: 'owner', label: 'Owner' },
    { key: 'tags', label: 'Tags' },
    { key: 'state', label: 'State' },
    { key: 'type', label: 'Type' },
    { key: 'automationStatus', label: 'Automation' },
    { key: 'component', label: 'Component' },
    { key: 'requirement', label: 'Requirement' },
]

const TestCaseHeader: FC<TestCaseHeaderProps> = ({
                                                     suiteName,
                                                     search,
                                                     onSearch,
                                                     onAdd,
                                                     anySelected,
                                                     allOnPageSelected,
                                                     onSelectAll,
                                                     onBulkEdit,
                                                     visibleColumns,
                                                     onToggleColumn,
                                                     onSort,
                                                     sortField,
                                                     sortDir,
                                                 }) => {
    // теперь принимает ColumnKey
    const renderArrow = (col: ColumnKey) => {
        if (col === 'select') return ''
        return col === sortField
            ? sortDir === 'asc'
                ? ' ↑'
                : ' ↓'
            : ''
    }

    return (
        <Row
            className="testcase-header sticky-top bg-white align-items-center mb-3"
            style={{ zIndex: 100, top: 0 }}
        >
            <Col><h5 className="m-0">{suiteName ?? 'Select a suite'}</h5></Col>

            <Col md="4">
                <InputGroup>
                    <Form.Control
                        placeholder="Search test cases..."
                        value={search}
                        onChange={e => onSearch(e.target.value)}
                    />
                    {search && (
                        <Button variant="outline-secondary" onClick={() => onSearch('')}>
                            ×
                        </Button>
                    )}
                </InputGroup>
            </Col>

            <Col md="auto">
                <Button
                    variant="outline-primary"
                    onClick={onBulkEdit}
                    disabled={!anySelected}
                >
                    Bulk Edit
                </Button>
            </Col>

            {visibleColumns.select && (
                <Col md="auto">
                    <Form.Check
                        type="checkbox"
                        checked={allOnPageSelected}
                        onChange={e => onSelectAll(e.target.checked)}
                        label=""
                    />
                </Col>
            )}

            <Col md="auto">
                <Button onClick={onAdd}>Add Test Case</Button>
            </Col>

            <Col md="auto">
                <DropdownButton
                    id="dropdown-columns"
                    title="Manage Columns"
                    variant="outline-secondary"
                >
                    {COLUMN_DEFS.filter(c => c.key !== 'select').map(c => (
                        <Form.Check
                            key={c.key}
                            type="checkbox"
                            id={`col-${c.key}`}
                            className="dropdown-item"
                            label={c.label + renderArrow(c.key)}
                            checked={!!visibleColumns[c.key]}
                            onChange={() => onToggleColumn(c.key)}
                        />
                    ))}
                </DropdownButton>
            </Col>
        </Row>
    )
}

export default TestCaseHeader
