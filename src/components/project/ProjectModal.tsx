// src/components/project/ProjectModal.tsx
import React, { FC, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { ProjectDTO } from '../../types/project';

interface Props {
    show: boolean;
    project?: ProjectDTO;
    onClose: () => void;
    onSave: (dto: Omit<ProjectDTO, 'id'>, id?: string) => void;
}

const ProjectModal: FC<Props> = ({ show, project, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        if (show) {
            setName(project?.name ?? '');
            setDesc(project?.description ?? '');
        }
    }, [show, project]);

    const handleSubmit = () => {
        if (!name.trim()) return;
        onSave({ name: name.trim(), description: desc.trim() || undefined }, project?.id);
    };

    return (
        <Modal show={show} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{project?.id ? 'Edit' : 'New'} Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {project?.id ? 'Update' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProjectModal;
