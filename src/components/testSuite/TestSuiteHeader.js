import React from 'react'
import { Button, Badge } from 'react-bootstrap'

/**
 * Props:
 *   - totalCount: number
 *   - onAdd: () => void
 */
export default function TestSuiteHeader({ totalCount, onAdd }) {
    return (
        <div className="sidebar-header">
            <h5 className="m-0">
                Folders{' '}
                <Badge bg="secondary" pill>
                    {totalCount}
                </Badge>
            </h5>
            <Button size="sm" variant="outline-secondary" onClick={onAdd}>
                Add
            </Button>
        </div>
    )
}
