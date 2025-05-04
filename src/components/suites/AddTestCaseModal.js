import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createTestCase } from '../../api/testCaseApi';

const AddTestCaseModal = ({ show, onClose, suiteId, onSave }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        preconditions: '',
        steps: '',
        expectedResult: '',
        useCase: '',
        priority: 'Medium',
        tags: '',
        state: '',
        owner: '',
        type: '',
        automationStatus: '',
        component: '',
        requirement: '',
    });

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            console.log('Submitting test case:', { ...form, suiteId }); // ← обов'язково додай
            await createTestCase({ ...form, suiteId });
            onSave();
            onClose();
        } catch (error) {
            console.error('Failed to create test case', error);
        }
    };

    const renderTextarea = (label, field) => (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="textarea"
                rows={5}
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
            />
        </Form.Group>
    );

    const renderInput = (label, field, type = 'text') => (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
            />
        </Form.Group>
    );

    const renderSelect = (label, field, options) => (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Select
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </Form.Select>
        </Form.Group>
    );

    return (
        <Modal show={show} onHide={onClose} backdrop="static" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Create Test Case</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={form.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            {renderTextarea('Description', 'description')}
                            {renderTextarea('Preconditions', 'preconditions')}
                            {renderTextarea('Steps', 'steps')}
                            {renderTextarea('Expected Result', 'expectedResult')}
                        </Col>
                        <Col md={6}>
                            {renderSelect('Priority', 'priority', ['High', 'Medium', 'Low'])}
                            {renderSelect('Tags', 'tags', ['Smoke', 'Regression', ''])}
                            {renderSelect('State', 'state', ['Draft', 'Ready', 'Deprecated'])}
                            {renderSelect('Owner', 'owner', ['QA', 'Dev', 'PM'])}
                            {renderSelect('Type', 'type', ['Functional', 'UI', 'API'])}
                            {renderSelect('Automation Status', 'automationStatus', ['Automated', 'Manual'])}
                            {renderSelect('Component', 'component', ['Login', 'Dashboard', 'Settings'])}
                            {renderInput('Requirement', 'requirement')}
                            {renderInput('Use Case', 'useCase')}
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTestCaseModal;
