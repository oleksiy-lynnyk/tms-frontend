import React, { FC, useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { updateCase } from '../../api/testCaseApi'
import type { TestCaseDTO, TestStepDTO } from '../../types'
import CreatableTagSelect, { Option } from '../common/CreatableTagSelect'
import TestCaseStepsEditor from './TestCaseStepsEditor'

import {
    priorityOptions,
    stateOptions,
    ownerOptions,
    typeOptions,
    automationOptions,
    componentOptions,
} from '../../constants/testcaseOptions'

export interface EditTestCaseModalProps {
    show: boolean
    onClose: () => void
    onSave: () => Promise<void>
    testCase: TestCaseDTO | null
    suiteId: string
}

const EditTestCaseModal: FC<EditTestCaseModalProps> = ({
                                                           show,
                                                           onClose,
                                                           onSave,
                                                           testCase,
                                                           suiteId,
                                                       }) => {
    const [form, setForm] = useState<Partial<TestCaseDTO>>({})
    const [tags, setTags] = useState<Option[]>([])

    useEffect(() => {
        if (testCase) {
            setForm({ ...testCase, steps: testCase.steps ?? [] })
            setTags(
                testCase.tags
                    ? testCase.tags.split(',').map((t: string) => ({ label: t, value: t }))
                    : []
            )
        }
    }, [testCase])

    const handleChange =
        (field: keyof TestCaseDTO) =>
            (
                e: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
            ) => {
                setForm((prev: Partial<TestCaseDTO>) => ({ ...prev, [field]: e.target.value }))
            }

    const handleSubmit = async (): Promise<void> => {
        if (!testCase) return

        const fullSuiteId = suiteId?.toString() ?? ''
        // не дозволяємо змінювати code з модалки
        const updates: Omit<TestCaseDTO, 'id'> = {
            code: testCase.code,
            title: form.title ?? '',
            preconditions: form.preconditions ?? '',
            description: form.description ?? '',
            steps: form.steps ?? [],
            expectedResult: form.expectedResult ?? '',
            priority: form.priority ?? '',
            owner: form.owner ?? '',
            tags: tags.map(o => o.value).join(','),
            state: form.state ?? '',
            type: form.type ?? '',
            automationStatus: form.automationStatus ?? '',
            component: form.component ?? '',
            useCase: form.useCase ?? '',
            requirement: form.requirement ?? '',
            suiteId: fullSuiteId,
            projectId: form.projectId ?? '',
        }

        await updateCase(testCase.id, updates)
        await onSave()
        onClose()
    }

    return (
        <Modal show={show} onHide={onClose} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Test Case {testCase?.code ? testCase.code : ''}
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
                            <Form.Group className="mb-3">
                                <TestCaseStepsEditor
                                    steps={form.steps as TestStepDTO[] ?? []}
                                    onChange={steps =>
                                        setForm(prev => ({ ...prev, steps }))
                                    }
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
