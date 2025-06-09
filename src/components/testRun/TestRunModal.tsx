// src/components/testRun/TestRunModal.tsx
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { TestRunDTO } from '../../types';
import UserSelect from '../common/UserSelect';
import StatusSelect from '../common/StatusSelect';

interface Props {
    show: boolean;
    onClose: () => void;
    onSave: (data: Partial<TestRunDTO>) => Promise<void>;
    formData: Partial<TestRunDTO>;
    setFormData: React.Dispatch<React.SetStateAction<Partial<TestRunDTO>>>;
}

const TestRunModal: React.FC<Props> = ({ show, onClose, onSave, formData, setFormData }) => {
    const handleChange = (field: keyof TestRunDTO, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        await onSave(formData);
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{formData.id ? 'Edit Test Run' : 'New Test Run'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={formData.name || ''}
                            onChange={e => handleChange('name', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={formData.description || ''}
                            onChange={e => handleChange('description', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <StatusSelect
                            value={formData.status || ''}
                            onChange={value => handleChange('status', value)}
                        />
                    </Form.Group>

                    <UserSelect
                        value={formData.assignedTo || ''}
                        onChange={value => handleChange('assignedTo', value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TestRunModal;
