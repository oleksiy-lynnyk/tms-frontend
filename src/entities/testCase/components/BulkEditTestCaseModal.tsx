import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import BaseModal from '../../../components/common/BaseModal';
import CreatableTagSelect, { Option } from '../../../components/common/CreatableTagSelect';
import type { TestCase } from '@/entities/testCase/types/testCaseTypes';
import {
    priorityOptions,
    ownerOptions,
    tagOptions,
    stateOptions,
    typeOptions,
    automationOptions,
    componentOptions,
} from '../../../constants/testcaseOptions';

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

    const footer = (
        <>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>Review and Update</Button>
        </>
    );

    return (
        <BaseModal
            title={`Bulk Edit Test Cases (${selectedIds.size})`}
            show={show}
            onClose={onClose}
            footer={footer}
            size="lg"
        >
            <div>
                {fieldDefs.map(({ key, label, options }) => (
                    <Form.Group className="mb-3" key={key}>
                        <Form.Label className="fw-bold">{label}</Form.Label>
                        <Form.Select
                            value={actions[key]}
                            onChange={handleActionChange(key)}
                            className="mb-2"
                        >
                            <option value="keep">Keep values as is</option>
                            <option value="replace">Replace existing values</option>
                            <option value="clear">Clear field</option>
                        </Form.Select>
                        {actions[key] === 'replace' && (
                            key === 'tags' ? (
                                <div>
                                    <CreatableTagSelect
                                        value={tagValues}
                                        onChange={setTagValues}
                                        placeholder={`Select or create ${label.toLowerCase()}…`}
                                    />
                                </div>
                            ) : (
                                <Form.Select
                                    value={values[key] || ''}
                                    onChange={handleValueChange(key)}
                                >
                                    <option value="">Select {label.toLowerCase()}</option>
                                    {options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </Form.Select>
                            )
                        )}
                    </Form.Group>
                ))}
            </div>
        </BaseModal>
    );
};

export default BulkEditTestCaseModal
