import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateTestCase } from '../../api/testCaseApi';
import RichTextEditor from './RichTextEditor';

const EditTestCaseModal = ({ show, onClose, testCase, onSave }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (testCase && testCase.id) {
      setForm(testCase);
    }
  }, [testCase]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateTestCase(form.id, form);
      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to update test case', error);
    }
  };

  const renderText = (label, field) => (
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <RichTextEditor
            value={form[field] || ''}
            onChange={(val) => handleChange(field, val)}
        />
      </Form.Group>
  );

  return (
      <Modal show={show} onHide={onClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Test Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                  type="text"
                  value={form.title || ''}
                  onChange={e => handleChange('title', e.target.value)}
              />
            </Form.Group>

            {renderText('Description', 'description')}
            {renderText('Preconditions', 'preconditions')}
            {renderText('Steps', 'steps')}
            {renderText('Expected Result', 'expectedResult')}
            {renderText('Use Case', 'useCase')}

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                  value={form.priority || 'Medium'}
                  onChange={e => handleChange('priority', e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                  type="text"
                  value={form.tags || ''}
                  onChange={e => handleChange('tags', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                  type="text"
                  value={form.state || ''}
                  onChange={e => handleChange('state', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                  type="text"
                  value={form.owner || ''}
                  onChange={e => handleChange('owner', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                  type="text"
                  value={form.type || ''}
                  onChange={e => handleChange('type', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Automation Status</Form.Label>
              <Form.Control
                  type="text"
                  value={form.automationStatus || ''}
                  onChange={e => handleChange('automationStatus', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Component</Form.Label>
              <Form.Control
                  type="text"
                  value={form.component || ''}
                  onChange={e => handleChange('component', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Requirement</Form.Label>
              <Form.Control
                  type="text"
                  value={form.requirement || ''}
                  onChange={e => handleChange('requirement', e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
  );
};

export default EditTestCaseModal;
