// src/entities/testCase/components/TestCaseModal.tsx
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import BaseFormModal from '../../../components/common/BaseFormModal';
import type { TestCaseDTO } from '../types/testCaseTypes';

interface Props {
    show: boolean;
    testCase?: TestCaseDTO;
    suiteId: string;
    projectId: string;
    onClose: () => void;
    onSave: (data: Partial<TestCaseDTO>) => Promise<void>;
}

const TestCaseModal: React.FC<Props> = ({ show, testCase, suiteId, projectId, onClose, onSave }) => {
    const [form, setForm] = useState<Partial<TestCaseDTO>>({
        title: '',
        description: '',
        preconditions: '',
        useCase: '',
        priority: '',
        state: '',
        type: '',
        owner: '',
        tags: '',
        automationStatus: '',
        requirement: '',
        component: '',
        suiteId,
        projectId
    });

    useEffect(() => {
        if (show) {
            setForm(testCase ? { ...testCase, suiteId, projectId } : { suiteId, projectId });
        }
    }, [show, testCase, suiteId, projectId]);

    const handleChange = (field: keyof TestCaseDTO, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <BaseFormModal
            title={form.id ? 'Edit Test Case' : 'New Test Case'}
            show={show}
            onClose={onClose}
            onSave={() => onSave(form)}
            form={form}
        >
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.title || ''}
                        onChange={e => handleChange('title', e.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        value={form.description || ''}
                        onChange={e => handleChange('description', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Preconditions</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        value={form.preconditions || ''}
                        onChange={e => handleChange('preconditions', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Use Case</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.useCase || ''}
                        onChange={e => handleChange('useCase', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.priority || ''}
                        onChange={e => handleChange('priority', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.type || ''}
                        onChange={e => handleChange('type', e.target.value)}
                    />
                </Form.Group>
            </Form>
        </BaseFormModal>
    );
};

export default TestCaseModal;
