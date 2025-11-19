import React, { useState } from 'react';
import { TestRunDTO } from '../types/testRunTypes';
import { TestCaseDTO } from '../../testCase/types/testCaseTypes';
import SelectCasesModal from '../../testCase/components/SelectCasesModal';

interface Props {
    form: Partial<TestRunDTO & { testCaseIds?: string[] }>;
    setForm: React.Dispatch<
        React.SetStateAction<Partial<TestRunDTO & { testCaseIds?: string[] }>>
    >;
}

const TestRunForm: React.FC<Props> = ({ form, setForm }) => {
    const [showCasesModal, setShowCasesModal] = useState(false);

    const handleChange = <
        K extends keyof (TestRunDTO & { testCaseIds?: string[] })
    >(
        key: K,
        value: (TestRunDTO & { testCaseIds?: string[] })[K]
    ) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleCasesSelected = (selected: TestCaseDTO[]) => {
        setForm(prev => ({ ...prev, testCaseIds: selected.map(tc => tc.id) }));
        setShowCasesModal(false);
    };

    return (
        <div>
            {/* Основні поля */}
            <div className="bs-fields mb-2">
                <div className="bs-field-row">
                    <div className="bs-field-actions" style={{ flex: 2 }}>
                        <label className="bs-field-label">Test Run Name</label>
                        <input
                            className="bs-action-select"
                            value={form.name || ''}
                            onChange={e => handleChange('name', e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Type</label>
                        <select
                            value={(form.type as string) || 'MANUAL'}
                            onChange={e => handleChange('type', e.target.value)}
                        >
                            <option value="MANUAL">Manual</option>
                            <option value="AUTOMATED">Automated</option>
                        </select>
                    </div>
                </div>
                <div className="bs-field-row">
                    <div className="bs-field-actions" style={{ flex: 1 }}>
                        <label className="bs-field-label">Description</label>
                        <input
                            className="bs-action-select"
                            value={form.description || ''}
                            onChange={e => handleChange('description', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Додаткові поля */}
            <div className="bs-fields mb-2">
                <div className="bs-field-row">
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Environment</label>
                        <select
                            value={(form.environmentId as string) || ''}
                            onChange={e => handleChange('environmentId', e.target.value)}
                        >
                            <option value="">—</option>
                        </select>
                    </div>
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Milestone</label>
                        <select
                            value={(form.milestoneId as string) || ''}
                            onChange={e => handleChange('milestoneId', e.target.value)}
                        >
                            <option value="">—</option>
                        </select>
                    </div>
                </div>
                <div className="bs-field-row">
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Default assignee</label>
                        <select
                            value={(form.defaultAssigneeId as string) || ''}
                            onChange={e => handleChange('defaultAssigneeId', e.target.value)}
                        >
                            <option value="">—</option>
                        </select>
                    </div>
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Tags</label>
                        <input
                            value={form.tags?.join(', ') || ''}
                            onChange={e =>
                                handleChange(
                                    'tags',
                                    e.target.value ? e.target.value.split(',').map(s => s.trim()) : []
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Конфігурації */}
            <div className="bs-fields mb-2">
                <div className="bs-field-row">
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Configuration</label>
                        <select
                            value={(form.configurationId as string) || ''}
                            onChange={e => handleChange('configurationId', e.target.value)}
                        >
                            <option value="">—</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Вибір кейсів */}
            <div className="bs-fields mb-2">
                <div className="bs-field-row">
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Test Cases</label>
                        <button type="button" onClick={() => setShowCasesModal(true)}>
                            Select cases
                        </button>
                    </div>
                </div>
            </div>

            <SelectCasesModal
                show={showCasesModal}
                onClose={() => setShowCasesModal(false)}
                onSelect={handleCasesSelected}
                selectedIds={form.testCaseIds || []}
            />
        </div>
    );
};

export default TestRunForm;
