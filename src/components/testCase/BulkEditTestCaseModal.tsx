import React, { useState, useEffect } from 'react'
import CreatableTagSelect, { Option } from '../common/CreatableTagSelect'
import type { TestCase } from '../../types'
import {
    priorityOptions,
    ownerOptions,
    tagOptions,
    stateOptions,
    typeOptions,
    automationOptions,
    componentOptions,
} from '../../constants/testcaseOptions'
import './BulkEditTestCaseModal.css'

interface BulkEditTestCaseModalProps {
    show: boolean
    onClose: () => void
    onSave: (updates: Partial<Omit<TestCase, "id" | "code">>) => Promise<void>
    selectedIds: Set<string>
}

type Action = 'keep' | 'clear' | 'replace'

const fieldDefs: Array<{
    key: keyof Omit<TestCase, "id" | "code">
    label: string
    options: string[]
}> = [
    { key: 'type',             label: 'Type of Test Case', options: typeOptions },
    { key: 'automationStatus', label: 'Automation Status', options: automationOptions },
    { key: 'priority',         label: 'Priority',          options: priorityOptions },
    { key: 'state',            label: 'State',             options: stateOptions },
    { key: 'owner',            label: 'Owner',             options: ownerOptions },
    { key: 'tags',             label: 'Tags',              options: tagOptions },
    { key: 'component',        label: 'Component',         options: componentOptions }
]

const BulkEditTestCaseModal: React.FC<BulkEditTestCaseModalProps> = ({
                                                                         show,
                                                                         onClose,
                                                                         onSave,
                                                                         selectedIds,
                                                                     }) => {
    const [actions, setActions] = useState<Record<string, Action>>(
        Object.fromEntries(fieldDefs.map(f => [f.key, 'keep'])) as Record<string, Action>
    )
    const [values, setValues] = useState<Record<string, string>>(
        Object.fromEntries(fieldDefs.filter(f => f.key !== 'tags').map(f => [f.key, ''])) as Record<string, string>
    )
    const [tagValues, setTagValues] = useState<Option[]>([])

    useEffect(() => {
        if (!show) return
        setActions(Object.fromEntries(fieldDefs.map(f => [f.key, 'keep'])) as Record<string, Action>)
        setValues(Object.fromEntries(fieldDefs.filter(f => f.key !== 'tags').map(f => [f.key, ''])) as Record<string, string>)
        setTagValues([])
    }, [show])

    const handleActionChange = (field: keyof Omit<TestCase, "id" | "code">) => (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const a = e.target.value as Action
        setActions(prev => ({ ...prev, [field]: a }))
        if (a === 'clear' && field !== 'tags') {
            setValues(prev => ({ ...prev, [field]: '' }))
        }
        if (a === 'clear' && field === 'tags') {
            setTagValues([])
        }
    }

    const handleValueChange = (field: keyof Omit<TestCase, "id" | "code">) => (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }))
    }

    const handleSubmit = async () => {
        const updates: Partial<Omit<TestCase, "id" | "code">> = {}
        for (const { key } of fieldDefs) {
            const action = actions[key]
            if (key === 'tags') {
                if (action === 'clear') {
                    updates.tags = ''
                } else if (action === 'replace') {
                    updates.tags = tagValues.map(o => o.value).join(',')
                }
            } else {
                const val = values[key]
                if (action === 'clear') {
                    updates[key] = undefined
                } else if (action === 'replace' && val) {
                    updates[key] = val as any
                }
            }
        }
        if (Object.keys(updates).length > 0) {
            await onSave(updates)
        }
        onClose()
    }

    if (!show) return null

    return (
        <div className="bs-modal-overlay">
            <div className="bs-modal-content" style={{ width: 600, maxWidth: '98vw' }}>
                <div className="bs-modal-header">
                    <span className="bs-modal-title">Bulk Edit Test Cases ({selectedIds.size})</span>
                    <button className="bs-close" onClick={onClose}>×</button>
                </div>
                <div className="bs-modal-body">
                    <div className="bs-fields">
                        {fieldDefs.map(({ key, label, options }) => (
                            <div className="bs-field-row" key={key}>
                                <div className="bs-field-label">{label}</div>
                                <div className="bs-field-actions">
                                    <select
                                        className="bs-action-select"
                                        value={actions[key]}
                                        onChange={handleActionChange(key)}
                                    >
                                        <option value="keep">Keep values as is</option>
                                        <option value="replace">Replace existing values</option>
                                        <option value="clear">Clear field</option>
                                    </select>
                                    {actions[key] === 'replace' && (
                                        key === 'tags'
                                            ? (
                                                <div style={{ marginTop: 8 }}>
                                                    <CreatableTagSelect
                                                        value={tagValues}
                                                        onChange={setTagValues}
                                                        placeholder={`Select or create ${label.toLowerCase()}…`}
                                                    />
                                                </div>
                                            ) : (
                                                <select
                                                    className="bs-value-select"
                                                    value={values[key] || ''}
                                                    onChange={handleValueChange(key)}
                                                    style={{ marginTop: 8 }}
                                                >
                                                    <option value="">Select {label.toLowerCase()}</option>
                                                    {options.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bs-modal-footer">
                    <button className="bs-btn bs-btn-outline" onClick={onClose}>Cancel</button>
                    <button className="bs-btn bs-btn-primary" onClick={handleSubmit}>Review and Update</button>
                </div>
            </div>
        </div>
    )
}

export default BulkEditTestCaseModal
