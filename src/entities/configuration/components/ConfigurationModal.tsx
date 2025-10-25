// src/entities/configuration/components/ConfigurationModal.tsx
import React from 'react';
import BaseFormModal from '../../../components/common/BaseFormModal';
import type {
    ConfigurationDTO,
} from '../types/configurationTypes';

interface Props {
    show: boolean;
    config?: ConfigurationDTO;
    onClose: () => void;
    onSave: () => Promise<void>;
    form: Partial<ConfigurationDTO>;
    setForm: React.Dispatch<React.SetStateAction<Partial<ConfigurationDTO>>>;
    isSaving?: boolean;
}

const ConfigurationModal: React.FC<Props> = ({
                                                 show,
                                                 onClose,
                                                 onSave,
                                                 form,
                                                 setForm,
                                                 isSaving = false,
                                             }) => {
    const handleChange = (key: keyof ConfigurationDTO, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    return (
        <BaseFormModal
            title={form.id ? 'Edit Configuration' : 'New Configuration'}
            show={show}
            onClose={onClose}
            onSave={onSave}
            form={form}
            isSaving={isSaving}
        >
            <div className="bs-fields">
                <div className="bs-field-row">
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Name</label>
                        <input
                            className="bs-action-select"
                            value={form.name || ''}
                            onChange={e => handleChange('name', e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="bs-field-actions">
                        <label className="bs-field-label">OS</label>
                        <input
                            className="bs-action-select"
                            value={form.os || ''}
                            onChange={e => handleChange('os', e.target.value)}
                        />
                    </div>
                </div>
                <div className="bs-field-row">
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Browser</label>
                        <input
                            className="bs-action-select"
                            value={form.browser || ''}
                            onChange={e => handleChange('browser', e.target.value)}
                        />
                    </div>
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Device</label>
                        <input
                            className="bs-action-select"
                            value={form.device || ''}
                            onChange={e => handleChange('device', e.target.value)}
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
                            onChange={e => handleChange('description', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </BaseFormModal>
    );
};

export default ConfigurationModal;
