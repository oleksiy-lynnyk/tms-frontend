import React, { FC } from 'react'
import { Col, Button } from 'react-bootstrap'

interface Props {
    anySelected: boolean
    onBulkEdit: () => void
    onBulkCopy: () => void
    onBulkMove: () => void
    onBulkDelete: () => void
}

const ActionToolbar: FC<Props> = ({
                                      anySelected,
                                      onBulkEdit,
                                      onBulkCopy,
                                      onBulkMove,
                                      onBulkDelete,
                                  }) => {
    if (!anySelected) return null

    return (
        <Col md="auto">
            <Button size="sm" variant="outline-primary" onClick={onBulkEdit}>
                Edit
            </Button>{' '}
            <Button size="sm" variant="outline-secondary" onClick={onBulkCopy}>
                Copy
            </Button>{' '}
            <Button size="sm" variant="outline-secondary" onClick={onBulkMove}>
                Move
            </Button>{' '}
            <Button size="sm" variant="outline-danger" onClick={onBulkDelete}>
                Delete
            </Button>
        </Col>
    )
}

export default ActionToolbar

