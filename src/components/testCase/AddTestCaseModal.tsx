// src/components/testCase/AddTestCaseModal.tsx
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import CreatableTagSelect, { Option } from '../common/CreatableTagSelect'
import { createTestCase } from '../../api/testCaseApi'
import type { TestCase } from './types'

import {
    priorityOptions,
    tagOptions,
    stateOptions,
    ownerOptions,
    typeOptions,
    automationOptions,
    componentOptions,
} from '../../constants/testcaseOptions'

interface AddTestCaseModalProps {
    show: boolean
    onClose: () => void
    suiteId: number
    onSave: () => Promise<void>
}

const AddTestCaseModal: React.FC<AddTestCaseModalProps> = ({ show, onClose, suiteId, onSave }) => {
    const [form, setForm] = useState<Partial<TestCase>>({
        title: '',
        preconditions: '',
        description: '',
        steps: '',
        expectedResult: '',
        priority: '',
        owner: '',
        tags: '',
        state: '',
        type: '',
        automationStatus: '',
        component: '',
        useCase: '',
        requirement: '',
    })
    const [tagValues, setTagValues] = useState<Option[]>([])

    useEffect(() => {
        if (!show) {
            setForm({
                title: '', preconditions: '', description: '', steps: '', expectedResult: '',
                priority: '', owner: '', tags: '', state: '', type: '', automationStatus: '', component: '', useCase: '', requirement: ''
            })
            setTagValues([])
        }
    }, [show])

    const handleChange = (field: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setForm(prev => ({ ...prev, [field]: e.target.value }))
        }

    const handleSave = async () => {
        if (!form.title?.trim()) return
        const updated: Partial<TestCase> = { ...form }
        if (tagValues.length) updated.tags = tagValues.map(o => o.value).join(',')
        await createTestCase({ ...updated, suiteId } as TestCase)
        await onSave()
        onClose()
    }

    return (
        <Modal show={show} onHide={onClose} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add Test Case</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={8}>
                            {/* Left fields: Title, Preconditions, Description, Steps, ExpectedResult */}
                            <Form.Group className="mb-3" controlId="add-title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.title}
                                    onChange={handleChange('title')}
                                    placeholder="Enter title"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="add-preconditions">
                                <Form.Label>Preconditions</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.preconditions}
                                    onChange={handleChange('preconditions')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="add-description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.description}
                                    onChange={handleChange('description')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="add-steps">
                                <Form.Label>Test Steps</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={form.steps}
                                    onChange={handleChange('steps')}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="add-expectedResult">
                                <Form.Label>Expected Result</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.expectedResult}
                                    onChange={handleChange('expectedResult')}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            {/* Right fields: Priority, Owner, Tags, State, Type, Automation, Component, Use Case, Requirement */}
                            <Form.Group className="mb-3" controlId="add-priority">
                                <Form.Label>Priority</Form.Label>
                                <Form.Select
                                    value={form.priority}
                                    onChange={handleChange('priority')}
                                >
                                    <option value="">Select priority</option>
                                    {priorityOptions.map(o => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="add-owner">
                                <Form.Label>Owner</Form.Label>
                                <Form.Select
                                    value={form.owner}
                                    onChange={handleChange('owner')}
                                >
                                    <option value="">Select owner</option>
                                    {ownerOptions.map(o => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="add-tags">
                                <Form.Label>Tags</Form.Label>
                                <CreatableTagSelect value={tagValues} onChange={setTagValues} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="add-state">
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    value={form.state}
                                    onChange={handleChange('state')}
                                >
                                    <option value="">Select state</option>
                                    {stateOptions.map(o => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="add-type">
                                <Form.Label>Type</Form.Label>
                                <Form.Select
                                    value={form.type}
                                    onChange={handleChange('type')}
                                >
                                    <option value="">Select type</option>
                                    {typeOptions.map(o => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="add-automationStatus">
                                <Form.Label>Automation Status</Form.Label>
                                <Form.Select
                                    value={form.automationStatus}
                                    onChange={handleChange('automationStatus')}
                                >
                                    <option value="">Select automation status</option>
                                    {automationOptions.map(o => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="add-component">
                                <Form.Label>Component</Form.Label>
                                <Form.Select
                                    value={form.component}
                                    onChange={handleChange('component')}
                                >
                                    <option value="">Select component</option>
                                    {componentOptions.map(o => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="add-useCase">
                                <Form.Label>Use Case</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.useCase}
                                    onChange={handleChange('useCase')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="add-requirement">
                                <Form.Label>Requirement</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.requirement}
                                    onChange={handleChange('requirement')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-end">
                <Button variant="outline-secondary" onClick={onClose}>Cancel</Button>
                <Button variant="outline-primary" onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTestCaseModal