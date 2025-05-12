// src/components/testCase/EditTestCaseModal.js

import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { updateTestCase } from '../../api/testCaseApi';

import {
    priorityOptions,
    tagOptions,
    stateOptions,
    ownerOptions,
    typeOptions,
    automationOptions,
    componentOptions,
} from '../../constants/testcaseOptions';

const EditTestCaseModal = ({ show, onClose, testCase, onSave }) => {
    // локальний стейт для форми
    const [form, setForm] = useState({
        title: '',
        preconditions: '',
        description: '',
        steps: '',
        expectedResult: '',
        priority: '',
        tags: '',
        state: '',
        owner: '',
        type: '',
        automationStatus: '',
        component: '',
        useCase: '',
        requirement: '',
    });

    // при відкритті модалки заповнюємо форму
    useEffect(() => {
        if (testCase) {
            setForm({
                title: testCase.title || '',
                preconditions: testCase.preconditions || '',
                description: testCase.description || '',
                steps: testCase.steps || '',
                expectedResult: testCase.expectedResult || '',
                priority: testCase.priority || '',
                tags: testCase.tags || '',
                state: testCase.state || '',
                owner: testCase.owner || '',
                type: testCase.type || '',
                automationStatus: testCase.automationStatus || '',
                component: testCase.component || '',
                useCase: testCase.useCase || '',
                requirement: testCase.requirement || '',
            });
        }
    }, [testCase]);

    const handleChange = field => e => {
        setForm(f => ({ ...f, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!testCase?.id) return;
        await updateTestCase(testCase.id, form);
        onSave();
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Test Case {testCase?.id ? `TC-${testCase.id}` : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        {/* Ліва колонка */}
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.title}
                                    onChange={handleChange('title')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Preconditions</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.preconditions}
                                    onChange={handleChange('preconditions')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.description}
                                    onChange={handleChange('description')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Test Steps</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={form.steps}
                                    onChange={handleChange('steps')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Expected Result</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.expectedResult}
                                    onChange={handleChange('expectedResult')}
                                />
                            </Form.Group>
                        </Col>

                        {/* Права колонка */}
                        <Col md={4}>
                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
                                <Form.Label>Tags</Form.Label>
                                <Form.Select
                                    value={form.tags}
                                    onChange={handleChange('tags')}
                                >
                                    <option value="">Select tags</option>
                                    {tagOptions.map(o => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
                                <Form.Label>Use Case</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.useCase}
                                    onChange={handleChange('useCase')}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
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
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTestCaseModal;
