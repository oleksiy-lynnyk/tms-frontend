// src/components/testRun/TestRunTable.tsx
import React from 'react'
import { Table, Button } from 'react-bootstrap'
import type { TestRunDTO as TestRun } from '../../types'

interface Props {
    runs: TestRun[]
    onEdit: (run: TestRun) => void
    onDelete: (run: TestRun) => Promise<void>
    onClone: (run: TestRun) => Promise<void>
    onView: (run: TestRun) => void       // <--- ДОДАНО
}

export default function TestRunTable({
                                         runs,
                                         onEdit,
                                         onDelete,
                                         onClone,
                                         onView,       // <--- ДОДАНО
                                     }: Props) {
    return (
        <Table striped hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {runs.map(run => (
                <tr
                    key={run.id}
                    onClick={() => onView(run)}
                    style={{ cursor: "pointer" }}
                >
                    <td>{run.id}</td>
                    <td>{run.name}</td>
                    <td>{run.status}</td>
                    <td>{new Date(run.startedAt).toLocaleString()}</td>
                    <td>
                        <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={e => { e.stopPropagation(); onEdit(run) }}
                        >
                            Edit
                        </Button>{' '}
                        <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={e => { e.stopPropagation(); onDelete(run) }}
                        >
                            Delete
                        </Button>{' '}
                        <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={e => { e.stopPropagation(); onClone(run) }}
                        >
                            Clone
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}
