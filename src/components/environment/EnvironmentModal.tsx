// src/components/environment/EnvironmentModal.tsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import type { EnvironmentDTO } from '../../types';

interface Props {
    show: boolean;
    onClose: () => void;
    onSave: (form: Partial<EnvironmentDTO>) => void;
    form: Partial<EnvironmentDTO>;
    setForm: React.Dispatch<React.SetStateAction<Partial<EnvironmentDTO>>>;
}

const EnvironmentModal: React.FC<Props> = ({ show, onClose, onSave, form, setForm }) => {
    const handleChange = (key: keyof EnvironmentDTO, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <div className="bs-modal-content">
                <div className="bs-modal-header">
                    <div className="bs-modal-title">Add Environment</div>
                    <button className="bs-close" onClick={onClose}>×</button>
                </div>
                <div className="bs-modal-body">
                    <div className="bs-fields">
                        <div className="bs-field-row">
                            <div className="bs-field-actions">
                                <label className="bs-field-label">Title</label>
                                <input
                                    className="bs-action-select"
                                    value={form.title || ''}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                />
                            </div>
                            <div className="bs-field-actions">
                                <label className="bs-field-label">Slug</label>
                                <input
                                    className="bs-action-select"
                                    value={form.slug || ''}
                                    onChange={(e) => handleChange('slug', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bs-field-row">
                            <div className="bs-field-actions" style={{ flex: 1 }}>
                                <label className="bs-field-label">Host</label>
                                <input
                                    className="bs-action-select"
                                    value={form.host || ''}
                                    onChange={(e) => handleChange('host', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bs-field-row">
                            <div className="bs-field-actions" style={{ flex: 1 }}>
                                <label className="bs-field-label">Description</label>
                                <textarea
                                    className="bs-action-select"
                                    rows={3}
                                    value={form.description || ''}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bs-modal-footer">
                    <button className="bs-btn bs-btn-outline" onClick={onClose}>Cancel</button>
                    <button className="bs-btn bs-btn-primary" onClick={() => onSave(form)}>Save</button>
                </div>
            </div>
        </Modal>
    );
};

export default EnvironmentModal;