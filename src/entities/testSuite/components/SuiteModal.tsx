// src/entities/testSuite/components/SuiteModal.tsx
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import BaseFormModal from '../../../components/common/BaseFormModal';
import type { TestSuiteDTO } from '../types/testSuiteTypes';

interface Props {
    show: boolean;
    suite?: TestSuiteDTO;
    parentId?: string | null;
    projectId: string;
    allSuites: TestSuiteDTO[];
    onClose: () => void;
    onSave: (data: Omit<TestSuiteDTO, 'id'>) => Promise<void>;
}

const SuiteModal: React.FC<Props> = ({ show, suite, parentId, projectId, allSuites, onClose, onSave }) => {
    const [form, setForm] = useState<Omit<TestSuiteDTO, 'id'>>({
        name: '',
        description: '',
        parentId: parentId ?? undefined,
        projectId,
    });

    useEffect(() => {
        if (show) {
            setForm({
                name: suite?.name ?? '',
                description: suite?.description ?? '',
                parentId: suite?.parentId ?? parentId ?? undefined,
                projectId: suite?.projectId ?? projectId,
            });
        }
    }, [show, suite, parentId, projectId]);

    const handleChange = (field: keyof Omit<TestSuiteDTO, 'id'>, value: string | undefined) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        await onSave(form);
        onClose();
    };

    return (
        <BaseFormModal
            title={suite ? 'Edit Test Suite' : 'New Test Suite'}
            show={show}
            onClose={onClose}
            onSave={handleSave}
            form={form}
        >
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Suite Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        value={form.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Parent Suite</Form.Label>
                    <Form.Select
                        value={form.parentId ?? ''}
                        onChange={(e) => handleChange('parentId', e.target.value || undefined)}
                    >
                        <option value="">-- No Parent (Root) --</option>
                        {allSuites
                            .filter((s) => !suite || s.id !== suite.id)
                            .map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
            </Form>
        </BaseFormModal>
    );
};

export default SuiteModal;
