import React, { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import BaseModal from '../../../components/common/BaseModal';
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

    const footer = (
        <>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSelect}>Select</Button>
        </>
    );

    return (
        <BaseModal
            title="Select Test Cases"
            show={show}
            onClose={onClose}
            footer={footer}
            size="lg"
            maxHeight="380px"
        >
            {cases.length === 0 ? (
                <div>Loading...</div>
            ) : (
                <Table size="sm">
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}></th>
                            <th>Code</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map(tc => (
                            <tr key={tc.id}>
                                <td>
                                    <Form.Check
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
                </Table>
            )}
        </BaseModal>
    );
};

export default SelectCasesModal;
