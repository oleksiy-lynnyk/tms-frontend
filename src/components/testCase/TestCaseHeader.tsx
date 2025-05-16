// src/components/testCase/TestCaseHeader.tsx
import React, { FC } from 'react'
import { InputGroup, Form, Button, Dropdown } from 'react-bootstrap'
import type { ColumnKey } from './types'

interface Props {
    suiteName?: string
    search: string
    onSearch: (s: string) => void
    onAdd: () => void

    anySelected: boolean
    onBulkEdit: () => void
    onBulkCopy: () => void
    onBulkMove: () => void
    onBulkDelete: () => void

    visibleColumns: Record<ColumnKey, boolean>
    onToggleColumn: (k: ColumnKey) => void
}

const TestCaseHeader: FC<Props> = ({
                                       suiteName,
                                       search,
                                       onSearch,
                                       onAdd,
                                       anySelected,
                                       onBulkEdit,
                                       onBulkCopy,
                                       onBulkMove,
                                       onBulkDelete,
                                       visibleColumns,
                                       onToggleColumn,
                                   }) => {
    return (
        <div
            className="testcase-header sticky-top bg-white d-flex align-items-center px-3 py-2"
            style={{ zIndex: 100, top: 0 }}
        >
            {/* Suite title */}
            <h5 className="m-0 me-3 flex-shrink-0">
                {suiteName ?? 'Select a suite'}
            </h5>

            {/* Bulk actions placed immediately after title */}
            {anySelected && (
                <div className="d-flex align-items-center me-3" style={{ gap: '0.5rem' }}>
                    <Button size="sm" variant="outline-primary" onClick={onBulkEdit}>
                        Edit
                    </Button>
                    <Button size="sm" variant="outline-secondary" onClick={onBulkCopy}>
                        Copy
                    </Button>
                    <Button size="sm" variant="outline-secondary" onClick={onBulkMove}>
                        Move
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={onBulkDelete}>
                        Delete
                    </Button>
                </div>
            )}

            {/* Right-aligned group: search, add, manage columns */}
            <div className="d-flex align-items-center ms-auto" style={{ gap: '0.75rem' }}>
                {/* Search (width halved) */}
                <div style={{ flexShrink: 0, width: '200px' }}>
                    <InputGroup>
                        <Form.Control
                            placeholder="Search test cases..."
                            value={search}
                            onChange={e => onSearch(e.target.value)}
                        />
                        {search && (
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => onSearch('')}
                            >
                                ×
                            </Button>
                        )}
                    </InputGroup>
                </div>

                {/* Add Test Case */}
                <Button size="sm" variant="outline-primary" onClick={onAdd}>
                    Add Test Case
                </Button>

                {/* Manage Columns */}
                <Dropdown>
                    <Dropdown.Toggle size="sm" variant="outline-primary" id="dropdown-columns">
                        Manage Columns
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        style={{ maxHeight: 250, overflowY: 'auto', padding: '0.5rem', fontSize: '14px' }}
                    >
                        {Object.entries(visibleColumns).map(([key, visible]) => (
                            <Form.Check
                                as="label"
                                key={key}
                                htmlFor={`col-${key}`}
                                className="d-flex align-items-center mb-1"
                                style={{ cursor: 'pointer', fontSize: '14px' }}
                            >
                                <Form.Check.Input
                                    type="checkbox"
                                    id={`col-${key}`}
                                    checked={visible}
                                    onChange={() => onToggleColumn(key as ColumnKey)}
                                />
                                <Form.Check.Label className="ms-2 mb-0" style={{ fontSize: '14px' }}>
                                    {key === 'automationStatus'
                                        ? 'Automation'
                                        : key.charAt(0).toUpperCase() + key.slice(1)}
                                </Form.Check.Label>
                            </Form.Check>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default TestCaseHeader