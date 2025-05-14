import React, { FC } from 'react';
import { Table, Button } from 'react-bootstrap';
import type { TestCase } from './types';

interface TestCaseTableProps {
    testCases: TestCase[];
    selectedIds: Set<number>;
    onToggleSelect: (id: number) => void;
    onSelectAll: (checked: boolean) => void;
    onEdit: (tc: TestCase) => void;
    onDelete: (tc: TestCase) => void;
}

const TestCaseTable: FC<TestCaseTableProps> = ({
                                                   testCases,
                                                   selectedIds,
                                                   onToggleSelect,
                                                   onSelectAll,
                                                   onEdit,
                                                   onDelete,
                                               }) => {
    const allSelected = testCases.length > 0 && selectedIds.size === testCases.length;

    return (
        <Table hover size="sm" className="table-bordered mb-0">
            <thead>
            <tr>
                <th style={{ width: '1%', textAlign: 'center' }}>
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={e => onSelectAll(e.target.checked)}
                    />
                </th>
                <th>ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Owner</th>
                <th>Tags</th>
                <th>State</th>
                <th>Type</th>
                <th>Automation</th>
                <th>Component</th>
                <th>Requirement</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {testCases.map(c => (
                <tr key={c.id}>
                    <td style={{ textAlign: 'center' }}>
                        <input
                            type="checkbox"
                            checked={selectedIds.has(c.id)}
                            onChange={() => onToggleSelect(c.id)}
                        />
                    </td>
                    <td>{`TC-${c.id}`}</td>
                    <td>{c.title}</td>
                    <td>{c.priority ?? '-'}</td>
                    <td>{c.owner ?? '-'}</td>
                    <td>{c.tags ?? '-'}</td>
                    <td>{c.state ?? '-'}</td>
                    <td>{c.type ?? '-'}</td>
                    <td>{c.automationStatus ?? '-'}</td>
                    <td>{c.component ?? '-'}</td>
                    <td>{c.requirement ?? '-'}</td>
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
                    <td colSpan={12} className="text-center text-muted">
                        No test cases found.
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default TestCaseTable;
