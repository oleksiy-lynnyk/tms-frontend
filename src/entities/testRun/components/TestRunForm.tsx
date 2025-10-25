import React, { useState } from 'react';
import SelectCasesModal from './SelectCasesModal';
import type {  TestCaseDTO } from 'entities/testCase/types/testCaseTypes';
import type { TestRunDTO } from 'entities/testRun/types/testRunTypes';


interface Props {
    form: Partial<TestRunDTO & { testCaseIds?: string[] }>;
    setForm: React.Dispatch<React.SetStateAction<Partial<TestRunDTO & { testCaseIds?: string[] }>>>;
}

const TestRunForm: React.FC<Props> = ({ form, setForm }) => {
    const [showCasesModal, setShowCasesModal] = useState(false);

    const handleChange = <K extends keyof (TestRunDTO & { testCaseIds?: string[] })>(
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
                            className="bs-action-select"
                            value={form.type || 'manual'}
                            onChange={e => handleChange('type', e.target.value)}
                        >
                            <option value="manual">Manual</option>
                            <option value="automated">Automated</option>
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
                            className="bs-action-select"
                            value={form.environmentId || ''}
                            onChange={e => handleChange('environmentId', e.target.value)}
                        >
                            {/* TODO: options */}
                        </select>
                    </div>
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Milestone</label>
                        <select
                            className="bs-action-select"
                            value={form.versionId || ''}
                            onChange={e => handleChange('versionId', e.target.value)}
                        >
                            {/* TODO: options */}
                        </select>
                    </div>
                </div>
                <div className="bs-field-row">
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Default assignee</label>
                        <select
                            className="bs-action-select"
                            value={form.assignedTo || ''}
                            onChange={e => handleChange('assignedTo', e.target.value)}
                        >
                            {/* TODO: options */}
                        </select>
                    </div>
                    <div className="bs-field-actions">
                        <label className="bs-field-label">Tags</label>
                        <input
                            className="bs-action-select"
                            value={form.tags || ''}
                            onChange={e => handleChange('tags', e.target.value)}
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
                            className="bs-action-select"
                            value={form.configurationId || ''}
                            onChange={e => handleChange('configurationId', e.target.value)}
                        >
                            {/* TODO: options */}
                        </select>
                    </div>
                </div>
            </div>

            {/* Вибір кейсів */}
            <div className="bs-fields mb-2">
                <div className="bs-field-row">
                    <div className="bs-field-actions" style={{ flex: 1 }}>
                        <label className="bs-field-label">Test Cases</label>
                        <button type="button" className="bs-btn bs-btn-outline" onClick={() => setShowCasesModal(true)}>
                            {form.testCaseIds && form.testCaseIds.length > 0
                                ? `${form.testCaseIds.length} selected`
                                : 'Select cases'}
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
