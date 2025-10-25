// src/entities/environment/components/EnvironmentModal.tsx
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { EnvironmentDTO } from '../types/environmentTypes';

export interface EnvironmentModalProps {
    show: boolean;
    environment?: EnvironmentDTO;
    form: Omit<EnvironmentDTO, 'id'>;
    setForm: React.Dispatch<React.SetStateAction<Omit<EnvironmentDTO, 'id'>>>;
    onClose: () => void;
    onSave: (data: Omit<EnvironmentDTO, 'id'>) => void;
}

const EnvironmentModal: React.FC<EnvironmentModalProps> = ({
                                                               show,
                                                               environment,
                                                               form,
                                                               setForm,
                                                               onClose,
                                                               onSave,
                                                           }) => (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>{environment ? 'Edit Environment' : 'New Environment'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="envName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={form.name || ''}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Environment name"
                    />
                </Form.Group>

                <Form.Group controlId="envSlug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        value={form.slug || ''}
                        onChange={e => setForm({ ...form, slug: e.target.value })}
                        placeholder="URL-friendly name"
                    />
                </Form.Group>

                <Form.Group controlId="envHost">
                    <Form.Label>Host</Form.Label>
                    <Form.Control
                        value={form.host || ''}
                        onChange={e => setForm({ ...form, host: e.target.value })}
                        placeholder="server.example.com"
                    />
                </Form.Group>

                <Form.Group controlId="envPort">
                    <Form.Label>Port</Form.Label>
                    <Form.Control
                        type="number"
                        value={form.port || 0}
                        onChange={e => setForm({ ...form, port: Number(e.target.value) || 0 })}
                        placeholder="8080"
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={() => onSave(form)}>Save</Button>
        </Modal.Footer>
    </Modal>
);

export default EnvironmentModal;