// src/components/testCase/AddTestCaseModal.tsx
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import CreatableTagSelect, { Option } from '../common/CreatableTagSelect'
import { createCase } from '../../api/testCaseApi'
import type { TestCaseDTO, CreateTestCaseDTO } from '../../types'


import {
    priorityOptions,
    stateOptions,
    ownerOptions,
    typeOptions,
    automationOptions,
    componentOptions,
} from '../../constants/testcaseOptions'

interface AddTestCaseModalProps {
    show: boolean
    onClose: () => void
    suiteId: string
    projectId: string
    onSave: () => Promise<void>
}

const AddTestCaseModal: React.FC<AddTestCaseModalProps> = ({
                                                               show,
                                                               onClose,
                                                               suiteId,
                                                               projectId,
                                                               onSave,
                                                           }) => {
    const [form, setForm] = useState<Partial<CreateTestCaseDTO>>({
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
            setTagValues([])
        }
    }, [show])

    const handleChange =
        (field: keyof CreateTestCaseDTO) =>
            (
                e: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
            ) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }))
            }

    const handleSave = async () => {
        const title = form.title?.trim()
        if (!title) return

        const dto: CreateTestCaseDTO = {
            suiteId,
            projectId,
            title,
            preconditions: form.preconditions?.trim() || undefined,
            description: form.description?.trim() || undefined,
            steps: form.steps?.trim() || undefined,
            expectedResult: form.expectedResult?.trim() || undefined,
            priority: form.priority?.trim() || undefined,
            owner: form.owner?.trim() || undefined,
            tags: tagValues.length
                ? tagValues.map((o) => o.value).join(',')
                : form.tags?.trim() || undefined,
            state: form.state?.trim() || undefined,
            type: form.type?.trim() || undefined,
            automationStatus: form.automationStatus?.trim() || undefined,
            component: form.component?.trim() || undefined,
            useCase: form.useCase?.trim() || undefined,
            requirement: form.requirement?.trim() || undefined,
        }

        await createCase(dto)
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
                            {/* --- поля Title, Preconditions, Description, Steps, ExpectedResult --- */}
                            <Form.Group className="mb-3" controlId="add-title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.title || ''}
                                    onChange={handleChange('title')}
                                    placeholder="Enter title"
                                />
                            </Form.Group>
                            {/* ... аналогічно інші Form.Group для preconditions, description, steps, expectedResult */}
                        </Col>
                        <Col md={4}>
                            {/* --- селекти та input'и для priority, owner, tags, state, type, automationStatus, component, useCase, requirement --- */}
                            <Form.Group className="mb-3" controlId="add-priority">
                                <Form.Label>Priority</Form.Label>
                                <Form.Select
                                    value={form.priority || ''}
                                    onChange={handleChange('priority')}
                                >
                                    <option value="">Select priority</option>
                                    {priorityOptions.map((o) => (
                                        <option key={o} value={o}>
                                            {o}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {/* ... інші групи */}
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-end">
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTestCaseModal
