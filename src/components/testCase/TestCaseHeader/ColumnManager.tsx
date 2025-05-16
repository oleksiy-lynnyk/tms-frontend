// src/components/testCase/TestCaseHeader/ColumnManager.tsx
import React, { FC } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import type { ColumnKey } from '../types'

interface Props {
    visibleColumns: Record<ColumnKey, boolean>
    onToggleColumn: (key: ColumnKey) => void
}

const COLUMN_DEFS: Array<{ key: ColumnKey; label: string }> = [
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
    { key: 'preconditions', label: 'Preconditions' },
    { key: 'description', label: 'Description' },
    { key: 'steps', label: 'Steps' },
    { key: 'expectedResult', label: 'Expected Result' },
    { key: 'useCase', label: 'Use Case' },
    { key: 'suiteId', label: 'Suite ID' },
]

const ColumnManager: FC<Props> = ({ visibleColumns, onToggleColumn }) => {
    const fontSize = '14px'

    return (
        <Dropdown>
            <Dropdown.Toggle
                size="sm"
                variant="outline-primary"
                id="dropdown-columns"
                style={{ fontSize }}
            >
                Manage Columns
            </Dropdown.Toggle>

            <Dropdown.Menu
                style={{
                    maxHeight: 250,
                    overflowY: 'auto',
                    padding: '0.5rem',
                    fontSize,            // ← застосовуємо 14px до <ul>
                }}
            >
                {COLUMN_DEFS.map(col => (
                    <Form.Check
                        as="label"
                        key={col.key}
                        htmlFor={`col-${col.key}`}
                        className="d-flex align-items-center mb-1"
                        style={{ cursor: 'pointer', fontSize }}
                    >
                        <Form.Check.Input
                            type="checkbox"
                            id={`col-${col.key}`}
                            checked={!!visibleColumns[col.key]}
                            onChange={() => onToggleColumn(col.key)}
                        />
                        <Form.Check.Label className="ms-2 mb-0" style={{ fontSize }}>
                            {col.label}
                        </Form.Check.Label>
                    </Form.Check>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ColumnManager
