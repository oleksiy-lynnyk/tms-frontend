// src/components/configuration/ConfigurationModal.tsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import type { ConfigurationDTO } from '../../types';
import { slugify } from '../../utils/slugify';

interface Props {
    show: boolean;
    onClose: () => void;
    onSave: (form: Partial<ConfigurationDTO>) => void;
    form: Partial<ConfigurationDTO>;
    setForm: React.Dispatch<React.SetStateAction<Partial<ConfigurationDTO>>>;
}

const ConfigurationModal: React.FC<Props> = ({ show, onClose, onSave, form, setForm }) => {
    const handleChange = (key: keyof ConfigurationDTO, value: string) => {
        if (key === 'title') {
            setForm((prev) => ({
                ...prev,
                title: value,
                slug: prev.slug ? prev.slug : slugify(value),
            }));
        } else {
            setForm((prev) => ({ ...prev, [key]: value }));
        }
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <div className="bs-modal-content">
                <div className="bs-modal-header">
                    <div className="bs-modal-title">Add Configuration</div>
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
                            <div className="bs-field-actions">
                                <label className="bs-field-label">OS</label>
                                <input
                                    className="bs-action-select"
                                    value={form.os || ''}
                                    onChange={(e) => handleChange('os', e.target.value)}
                                />
                            </div>
                            <div className="bs-field-actions">
                                <label className="bs-field-label">Browser</label>
                                <input
                                    className="bs-action-select"
                                    value={form.browser || ''}
                                    onChange={(e) => handleChange('browser', e.target.value)}
                                />
                            </div>
                            <div className="bs-field-actions">
                                <label className="bs-field-label">Device</label>
                                <input
                                    className="bs-action-select"
                                    value={form.device || ''}
                                    onChange={(e) => handleChange('device', e.target.value)}
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

export default ConfigurationModal;
