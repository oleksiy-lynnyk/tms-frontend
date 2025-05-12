import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const TestSuiteModal = ({ show, onClose, onSave, suite, allSuitesFlat }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');

    useEffect(() => {
        setName(suite?.name || '');
        setDescription(suite?.description || '');
        setParentId(suite?.parentId || '');
    }, [suite]);

    const handleSubmit = () => {
        onSave({
            id: suite?.id,
            name,
            description,
            parentId: parentId || null
        });
    };

    // Функція для створення плоского списку без вкладеності
    const flatten = (nodes, out = []) => {
        nodes.forEach(n => {
            out.push(n);
            if (n.children) flatten(n.children, out);
        });
        return out;
    };

    const flatList = flatten(allSuitesFlat || []);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{suite ? 'Edit Folder' : 'New Folder'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Folder name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Parent Folder</Form.Label>
                    <Form.Select
                        value={parentId}
                        onChange={e => setParentId(e.target.value)}
                    >
                        <option value="">— none —</option>
                        {flatList
                            .filter(s => s.id !== suite?.id)
                            .map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>
                    {suite ? 'Save' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TestSuiteModal;
