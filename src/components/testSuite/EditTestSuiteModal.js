import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTestSuiteModal = ({ show, onClose, onSave, suite = {} }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(suite.name || '');
        setDescription(suite.description || '');
    }, [suite]);

    const handleSubmit = () => {
        if (name.trim()) {
            onSave({ ...suite, name, description });
            onClose();
        }
    };

    return (
        <Modal show={show} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{suite.id ? 'Edit Folder' : 'Create Folder'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={handleSubmit}>
                    {suite.id ? 'Update' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTestSuiteModal;
