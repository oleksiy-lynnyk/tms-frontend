import React, { useEffect, useState } from 'react';
import type { TestCaseDTO } from 'entities/testCase/types/testCaseTypes';

interface Props {
    show: boolean;
    selectedIds: string[];
    onSelect: (cases: TestCaseDTO[]) => void;
    onClose: () => void;
}

// TODO: fetchCases має бути з твого апі
const fetchCases = async (): Promise<TestCaseDTO[]> => {
    // Підключи свій fetchTestCases
    return [];
};

const SelectCasesModal: React.FC<Props> = ({ show, selectedIds, onSelect, onClose }) => {
    const [cases, setCases] = useState<TestCaseDTO[]>([]);
    const [checked, setChecked] = useState<string[]>(selectedIds);

    useEffect(() => {
        if (show) {
            fetchCases().then(setCases);
            setChecked(selectedIds);
        }
    }, [show, selectedIds]);

    const toggleCheck = (id: string) => {
        setChecked(prev =>
            prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
        );
    };

    const handleSelect = () => {
        onSelect(cases.filter(tc => checked.includes(tc.id)));
    };

    if (!show) return null;

    return (
        <div className="bs-modal-overlay">
            <div className="bs-modal-content" style={{ minWidth: 480, maxWidth: 700 }}>
                <div className="bs-modal-header">
                    <div className="bs-modal-title">Select Test Cases</div>
                    <button className="bs-close" type="button" onClick={onClose}>×</button>
                </div>
                <div className="bs-modal-body" style={{ maxHeight: 380, overflowY: 'auto' }}>
                    {cases.length === 0
                        ? <div>Loading...</div>
                        : <table className="table table-sm">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Code</th>
                                <th>Title</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cases.map(tc => (
                                <tr key={tc.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={checked.includes(tc.id)}
                                            onChange={() => toggleCheck(tc.id)}
                                        />
                                    </td>
                                    <td>{tc.code}</td>
                                    <td>{tc.title}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    }
                </div>
                <div className="bs-modal-footer">
                    <button className="bs-btn bs-btn-outline" type="button" onClick={onClose}>Cancel</button>
                    <button className="bs-btn bs-btn-primary" type="button" onClick={handleSelect}>Select</button>
                </div>
            </div>
        </div>
    );
};

export default SelectCasesModal;
