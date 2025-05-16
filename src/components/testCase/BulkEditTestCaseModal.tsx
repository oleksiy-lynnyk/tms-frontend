// src/components/testCase/BulkEditTestCaseModal.tsx
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import CreatableTagSelect, { Option } from '../common/CreatableTagSelect'
import type { TestCase } from './types'
import {
    priorityOptions,
    ownerOptions,
    tagOptions,
    stateOptions,
    typeOptions,
    automationOptions,
    componentOptions,
} from '../../constants/testcaseOptions'

interface BulkEditTestCaseModalProps {
    show: boolean
    onClose: () => void
    onSave: (updates: Partial<TestCase>) => Promise<void>
    selectedIds: Set<number>
}

type Action = 'keep' | 'clear' | 'replace'

const fieldDefs: Array<{
    key: keyof TestCase
    label: string
    options: string[]
}> = [
    { key: 'priority',         label: 'Priority',         options: priorityOptions },
    { key: 'owner',            label: 'Owner',            options: ownerOptions },
    { key: 'tags',             label: 'Tags',             options: tagOptions },
    { key: 'state',            label: 'State',            options: stateOptions },
    { key: 'type',             label: 'Type',             options: typeOptions },
    { key: 'automationStatus', label: 'Automation Status', options: automationOptions },
    { key: 'component',        label: 'Component',        options: componentOptions },
]

const BulkEditTestCaseModal: React.FC<BulkEditTestCaseModalProps> = ({
                                                                         show,
                                                                         onClose,
                                                                         onSave,
                                                                         selectedIds,
                                                                     }) => {
    // state for actions per field
    const [actions, setActions] = useState<Record<string, Action>>(Object.fromEntries(
        fieldDefs.map(f => [f.key, 'keep'])
    ) as Record<string,Action>)
    // state for scalar field values
    const [values, setValues] = useState<Record<string, string>>(Object.fromEntries(
        fieldDefs.filter(f => f.key !== 'tags').map(f => [f.key, ''])
    ) as Record<string,string>)
    // separate state for tag Options
    const [tagValues, setTagValues] = useState<Option[]>([])

    useEffect(() => {
        if (!show) {
            // reset all state on close
            setActions(Object.fromEntries(fieldDefs.map(f => [f.key, 'keep'])) as Record<string,Action>)
            setValues(Object.fromEntries(fieldDefs.filter(f => f.key !== 'tags').map(f => [f.key, ''])) as Record<string,string>)
            setTagValues([])
        }
    }, [show])

    const handleActionChange = (field: keyof TestCase) => (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const a = e.target.value as Action
        setActions(prev => ({ ...prev, [field]: a }))
        if (a === 'clear' && field !== 'tags') {
            setValues(prev => ({ ...prev, [field]: '' }))
        }
        if (a === 'clear' && field === 'tags') {
            setTagValues([])
        }
    }

    const handleValueChange = (field: keyof TestCase) => (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }))
    }

    const handleSubmit = async () => {
        const updates: Partial<TestCase> = {}
        for (const { key } of fieldDefs) {
            const action = actions[key]
            if (key === 'tags') {
                if (action === 'clear') {
                    updates.tags = ''
                } else if (action === 'replace' && tagValues.length > 0) {
                    updates.tags = tagValues.map(o => o.value).join(',')
                }
            } else {
                const val = values[key]
                if (action === 'clear') {
                    updates[key] = undefined
                } else if (action === 'replace' && val) {
                    updates[key] = val as any
                }
            }
        }
        if (Object.keys(updates).length > 0) {
            await onSave(updates)
        }
        onClose()
    }

    return (
        <Modal show={show} onHide={onClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Bulk Edit Test Cases ({selectedIds.size})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="gx-3 gy-3">
                    {fieldDefs.map(({ key, label, options }) => (
                        <Col md={key === 'tags' ? 12 : 6} key={key}>
                            <Form.Group controlId={`bulk-${key}`}>
                                <Form.Label>{label}</Form.Label>
                                <Form.Select
                                    value={actions[key]}
                                    onChange={handleActionChange(key)}
                                >
                                    <option value="keep">Keep as is</option>
                                    <option value="clear">Clear field</option>
                                    <option value="replace">Replace all with</option>
                                </Form.Select>

                                {actions[key] === 'replace' && key !== 'tags' && (
                                    <Form.Select
                                        className="mt-2"
                                        value={values[key]}
                                        onChange={handleValueChange(key)}
                                    >
                                        <option value="">Select {label.toLowerCase()}</option>
                                        {options.map(opt => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                                {actions[key] === 'replace' && key === 'tags' && (
                                    <div className="mt-2">
                                        <CreatableTagSelect
                                            value={tagValues}
                                            onChange={setTagValues}
                                            placeholder="Select or create tags…"
                                        />
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-end">
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BulkEditTestCaseModal