import React from 'react';
import { Form } from 'react-bootstrap';
import BaseFormModal from '../../../components/common/BaseFormModal';
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
}) => {
    const handleSave = async () => {
        await onSave(form);
    };

    return (
        <BaseFormModal
            title={environment ? 'Edit Environment' : 'New Environment'}
            show={show}
            onClose={onClose}
            onSave={handleSave}
            form={form}
        >
            <Form>
                <Form.Group controlId="envName" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={form.name || ''}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Environment name"
                    />
                </Form.Group>

                <Form.Group controlId="envSlug" className="mb-3">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        value={form.slug || ''}
                        onChange={e => setForm({ ...form, slug: e.target.value })}
                        placeholder="URL-friendly name"
                    />
                </Form.Group>

                <Form.Group controlId="envHost" className="mb-3">
                    <Form.Label>Host</Form.Label>
                    <Form.Control
                        value={form.host || ''}
                        onChange={e => setForm({ ...form, host: e.target.value })}
                        placeholder="server.example.com"
                    />
                </Form.Group>

                <Form.Group controlId="envPort" className="mb-3">
                    <Form.Label>Port</Form.Label>
                    <Form.Control
                        type="number"
                        value={form.port || 0}
                        onChange={e => setForm({ ...form, port: Number(e.target.value) || 0 })}
                        placeholder="8080"
                    />
                </Form.Group>
            </Form>
        </BaseFormModal>
    );
};

export default EnvironmentModal;