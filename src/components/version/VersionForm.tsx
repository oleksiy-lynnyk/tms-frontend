// src/components/version/VersionForm.tsx
import React from 'react';
import { Form } from 'react-bootstrap';
import type { VersionDTO } from '../../types';

export interface VersionFormProps {
    form: Partial<VersionDTO>;
    setForm: React.Dispatch<React.SetStateAction<Partial<VersionDTO>>>;
    onClose: () => void;
    onSave: (dto: Partial<VersionDTO>) => Promise<void>;
}

const VersionForm: React.FC<VersionFormProps> = ({
                                                     form,
                                                     setForm,
                                                     onClose,
                                                     onSave
                                                 }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name="title"
                    value={form.title || ''}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                    name="slug"
                    value={form.slug || ''}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    name="description"
                    as="textarea"
                    rows={2}
                    value={form.description || ''}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className="mt-3 d-flex justify-content-end">
                <button className="btn btn-secondary btn-sm me-2" onClick={onClose}>Cancel</button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={e => {
                        e.preventDefault();
                        onSave(form);
                    }}
                >
                    Save
                </button>
            </div>
        </Form>
    );
};

export default VersionForm;
