// src/entities/version/components/VersionModal.tsx
import React from 'react'
import BaseFormModal from '../../../components/common/BaseFormModal'
import type { VersionDTO } from '../types/versionTypes'

interface VersionModalProps {
    /** Відкриття/закриття модалки */
    show: boolean
    /** Існуюча версія для редагування (undefined — створення нової) */
    version?: VersionDTO
    /** Поля форми */
    form: Partial<VersionDTO>
    /** Сеттер для полів форми */
    setForm: React.Dispatch<React.SetStateAction<Partial<VersionDTO>>>
    /** Колбек закриття */
    onClose: () => void
    /** Колбек збереження (повертає Promise, щоб BaseFormModal міг керувати кнопкою Save) */
    onSave: () => Promise<void>
    /** Стейт «зберігається зараз» */
    isSaving?: boolean
}

const VersionModal: React.FC<VersionModalProps> = ({
                                                       show,
                                                       version,
                                                       form,
                                                       setForm,
                                                       onClose,
                                                       onSave,
                                                       isSaving = false,
                                                   }) => {
    const handleChange = (key: keyof VersionDTO, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    return (
        <BaseFormModal
            title={version ? 'Edit Version' : 'New Version'}
            show={show}
            onClose={onClose}
            onSave={onSave}
            form={form}
            isSaving={isSaving}
        >
            <div className="bs-fields">
                <div className="bs-field-row">
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Title</label>
                        <input
                            className="bs-action-input"
                            value={form.title || ''}
                            onChange={e => handleChange('title', e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                </div>
                <div className="bs-field-row">
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Slug</label>
                        <input
                            className="bs-action-input"
                            value={form.slug || ''}
                            onChange={e => handleChange('slug', e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="bs-field-row">
                    <div className="bs-field-actions" style={{ flex: 1 }}>
                        <label className="bs-field-label">Description</label>
                        <textarea
                            className="bs-action-textarea"
                            rows={3}
                            value={form.description || ''}
                            onChange={e => handleChange('description', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </BaseFormModal>
    )
}

export default VersionModal
