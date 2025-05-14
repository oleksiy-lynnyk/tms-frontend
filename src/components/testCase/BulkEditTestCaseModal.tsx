import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { TestCase } from './types';

export interface BulkEditTestCaseModalProps {
  show: boolean;
  onClose: () => void;
  selectedIds: Set<number>;
  onSave: (updates: Partial<TestCase>) => Promise<void>;
}

const BulkEditTestCaseModal: React.FC<BulkEditTestCaseModalProps> = ({
                                                                       show,
                                                                       onClose,
                                                                       selectedIds,
                                                                       onSave,
                                                                     }) => {
  const [updates, setUpdates] = useState<Partial<TestCase>>({});

  const handleChange =
      (field: keyof TestCase) =>
          (e: React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >) => {
            const v = e.target.value;
            setUpdates(prev => ({ ...prev, [field]: v }));
          };

  const handleSubmit = async () => {
    const payload: Partial<TestCase> = {};
    Object.entries(updates).forEach(([k, v]) => {
      if (v != null && v !== '') payload[k as keyof TestCase] = v as any;
    });
    await onSave(payload);
  };

  return (
      <Modal show={show} onHide={onClose} size="lg" backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Bulk Edit ({selectedIds.size} selected)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Priority */}
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select defaultValue="" onChange={handleChange('priority')}>
                <option value="">No change</option>
                {/* priorityOptions */}
              </Form.Select>
            </Form.Group>
            {/* Tags */}
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Select defaultValue="" onChange={handleChange('tags')}>
                <option value="">No change</option>
                {/* tagOptions */}
              </Form.Select>
            </Form.Group>
            {/* State */}
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="" onChange={handleChange('state')}>
                <option value="">No change</option>
                {/* stateOptions */}
              </Form.Select>
            </Form.Group>
            {/* Automation Status */}
            <Form.Group className="mb-3">
              <Form.Label>Automation Status</Form.Label>
              <Form.Select
                  defaultValue=""
                  onChange={handleChange('automationStatus')}
              >
                <option value="">No change</option>
                {/* automationOptions */}
              </Form.Select>
            </Form.Group>
            {/* Component */}
            <Form.Group className="mb-3">
              <Form.Label>Component</Form.Label>
              <Form.Select defaultValue="" onChange={handleChange('component')}>
                <option value="">No change</option>
                {/* componentOptions */}
              </Form.Select>
            </Form.Group>
            {/* Use Case */}
            <Form.Group className="mb-3">
              <Form.Label>Use Case</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="No change"
                  onChange={handleChange('useCase')}
              />
            </Form.Group>
            {/* Requirement */}
            <Form.Group className="mb-3">
              <Form.Label>Requirement</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="No change"
                  onChange={handleChange('requirement')}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default BulkEditTestCaseModal;
