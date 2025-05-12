// src/components/testCase/TestCaseHeader.js

import React from 'react';
import { Row, Col, InputGroup, Form, Button, Dropdown } from 'react-bootstrap';

// Список колонок, які реально є в таблиці TestCaseTable
const COLUMN_DEFS = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'Priority' },
    { key: 'owner', label: 'Owner' },
    { key: 'tags', label: 'Tags' },
    { key: 'state', label: 'State' },
    { key: 'type', label: 'Type of Test Case' },
    { key: 'automationStatus', label: 'Automation Status' },
    { key: 'component', label: 'Component' },
    { key: 'requirement', label: 'Requirement' },
];

const TestCaseHeader = ({
                            suiteName,
                            search,
                            onSearch,
                            onAdd,
                            visibleColumns,
                            onToggleColumn,
                            onSort,
                            sortField,
                            sortDir,
                        }) => (
    <Row
        className="sticky-top bg-white align-items-center mb-3 testcase-header"
        style={{ zIndex: 100, top: 0 }}
    >
        {/* Назва сьюту */}
        <Col>
            <h5 className="m-0">{suiteName || 'Select a suite'}</h5>
        </Col>

        {/* Пошук */}
        <Col md="4">
            <InputGroup>
                <Form.Control
                    placeholder="Search test cases..."
                    value={search}
                    onChange={e => onSearch(e.target.value)}
                />
                {search && (
                    <Button variant="outline-secondary" onClick={() => onSearch('')}>
                        &times;
                    </Button>
                )}
            </InputGroup>
        </Col>

        {/* Додати кейс */}
        <Col md="auto">
            <Button onClick={onAdd}>Add Test Case</Button>
        </Col>

        {/* Менеджер колонок */}
        <Col md="auto">
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                    Manage Columns
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-2">
                    {COLUMN_DEFS.map(col => (
                        <div key={col.key} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`col-${col.key}`}
                                checked={visibleColumns[col.key]}
                                onChange={() => onToggleColumn(col.key)}
                            />
                            <label className="form-check-label ms-2" htmlFor={`col-${col.key}`}>
                                {col.label}
                            </label>
                        </div>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </Col>
    </Row>
);

export default TestCaseHeader;
