// src/components/testCase/EditTestCaseModal.tsx
import React, { FC, useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { updateTestCase } from '../../api/testCaseApi'
import type { TestCase } from './types'
import CreatableTagSelect, { Option } from '../common/CreatableTagSelect'

import {
    priorityOptions,
    tagOptions,
    stateOptions,
    ownerOptions,
    typeOptions,
    automationOptions,
    componentOptions,
} from '../../constants/testcaseOptions'

export interface EditTestCaseModalProps {
    show: boolean
    onClose: () => void
    onSave: () => void
    testCase: TestCase | null
    suiteId: number
}

const EditTestCaseModal: FC<EditTestCaseModalProps> = ({
                                                           show,
                                                           onClose,
                                                           onSave,
                                                           testCase,
                                                           suiteId,
                                                       }) => {
    const [form, setForm] = useState<Partial<TestCase>>({})
    const [tags, setTags] = useState<Option[]>([])

    useEffect(() => {
        if (testCase) {
            setForm({ ...testCase })
            setTags(
                testCase.tags
                    ? testCase.tags.split(',').map(t => ({ label: t, value: t }))
                    : []
            )
        }
    }, [testCase])

    const handleChange =
        (field: keyof TestCase) =>
            (
                e: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
            ) => {
                setForm(prev => ({ ...prev, [field]: e.target.value }))
            }

    const handleSubmit = async () => {
        if (!testCase) return
        const updates: Partial<TestCase> = { ...form, suiteId }
        updates.tags = tags.map(o => o.value).join(',')
        await updateTestCase(testCase.id, updates)
        onSave()
        onClose()
    }

    return (
        <Modal show={show} onHide={onClose} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Test Case {testCase ? `TC-${testCase.id}` : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3" controlId="edit-title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.title ?? ''}
                                    onChange={handleChange('title')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-preconditions">
                                <Form.Label>Preconditions</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.preconditions ?? ''}
                                    onChange={handleChange('preconditions')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.description ?? ''}
                                    onChange={handleChange('description')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-steps">
                                <Form.Label>Test Steps</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={form.steps ?? ''}
                                    onChange={handleChange('steps')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-expectedResult">
                                <Form.Label>Expected Result</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.expectedResult ?? ''}
                                    onChange={handleChange('expectedResult')}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="edit-priority">
                                <Form.Label>Priority</Form.Label>
                                <Form.Select
                                    value={form.priority ?? ''}
                                    onChange={handleChange('priority')}
                                >
                                    <option value="">Select priority</option>
                                    {priorityOptions.map(o => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-owner">
                                <Form.Label>Owner</Form.Label>
                                <Form.Select
                                    value={form.owner ?? ''}
                                    onChange={handleChange('owner')}
                                >
                                    <option value="">Select owner</option>
                                    {ownerOptions.map(o => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-tags">
                                <Form.Label>Tags</Form.Label>
                                <CreatableTagSelect
                                    value={tags}
                                    onChange={setTags}
                                    placeholder="Select or create tags…"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-state">
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    value={form.state ?? ''}
                                    onChange={handleChange('state')}
                                >
                                    <option value="">Select state</option>
                                    {stateOptions.map(o => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-type">
                                <Form.Label>Type</Form.Label>
                                <Form.Select
                                    value={form.type ?? ''}
                                    onChange={handleChange('type')}
                                >
                                    <option value="">Select type</option>
                                    {typeOptions.map(o => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-automationStatus">
                                <Form.Label>Automation Status</Form.Label>
                                <Form.Select
                                    value={form.automationStatus ?? ''}
                                    onChange={handleChange('automationStatus')}
                                >
                                    <option value="">Select automation status</option>
                                    {automationOptions.map(o => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-component">
                                <Form.Label>Component</Form.Label>
                                <Form.Select
                                    value={form.component ?? ''}
                                    onChange={handleChange('component')}
                                >
                                    <option value="">Select component</option>
                                    {componentOptions.map(o => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-useCase">
                                <Form.Label>Use Case</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.useCase ?? ''}
                                    onChange={handleChange('useCase')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="edit-requirement">
                                <Form.Label>Requirement</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.requirement ?? ''}
                                    onChange={handleChange('requirement')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-end">
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTestCaseModal