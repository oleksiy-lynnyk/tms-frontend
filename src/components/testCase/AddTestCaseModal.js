// src/components/testCase/AddTestCaseModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createTestCase } from '../../api/testCaseApi';

import {
    priorityOptions,
    tagOptions,
    stateOptions,
    ownerOptions,
    typeOptions,
    automationOptions,
    componentOptions,
} from '../../constants/testcaseOptions';

const AddTestCaseModal = ({ show, onClose, suiteId, onSave }) => {
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

    // Якщо відчиняють модалку вдруге, можна скидати форму
    useEffect(() => {
        if (show) {
            setForm({
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
        }
    }, [show]);

    const handleChange = field => e => {
        setForm(f => ({ ...f, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!form.title.trim()) return; // мінімальна валідація
        await createTestCase({ ...form, suiteId });
        onSave();
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add Test Case</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row>
                        {/* Ліва колонка — текстові поля */}
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.title}
                                    onChange={handleChange('title')}
                                    placeholder="Enter title"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Preconditions</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.preconditions}
                                    onChange={handleChange('preconditions')}
                                    placeholder="Enter preconditions"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.description}
                                    onChange={handleChange('description')}
                                    placeholder="Enter description"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Test Steps</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={form.steps}
                                    onChange={handleChange('steps')}
                                    placeholder="Enter test steps"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Expected Result</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={form.expectedResult}
                                    onChange={handleChange('expectedResult')}
                                    placeholder="Enter expected result"
                                />
                            </Form.Group>
                        </Col>

                        {/* Права колонка — селекти й короткі інпути */}
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
                                    placeholder="Enter use case"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Requirement</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={form.requirement}
                                    onChange={handleChange('requirement')}
                                    placeholder="Enter requirement"
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

export default AddTestCaseModal;
