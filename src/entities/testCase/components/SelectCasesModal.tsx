// src/entities/testCase/components/SelectCasesModal.tsx

import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { TestCaseDTO } from '@/entities/testCase/types/testCaseTypes';
import { fetchCasesBySuite } from '@/entities/testCase/api/testCaseApi';

interface Props {
    show: boolean;
    selectedIds: string[];
    onSelect: (cases: TestCaseDTO[]) => void;
    onClose: () => void;
    suiteId?: string;
}

const SelectCasesModal: React.FC<Props> = ({
                                               show,
                                               selectedIds,
                                               onSelect,
                                               onClose,
                                               suiteId,
                                           }) => {
    const [cases, setCases] = useState<TestCaseDTO[]>([]);
    const [checked, setChecked] = useState<string[]>(selectedIds);

    // Підвантажуємо кейси при зміні suiteId
    useEffect(() => {
        if (!suiteId) return;
        fetchCasesBySuite(suiteId).then(page => {
            setCases(page.content);
        }).catch(console.error);
    }, [suiteId]);

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
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Select Test Cases</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 400, overflowY: 'auto' }}>
                {cases.length === 0 ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <table className="table">
                        <thead>
                        <tr>
                            <th style={{ width: '40px' }}></th>
                            <th style={{ width: '100px' }}>Code</th>
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
                    </table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSelect}>
                    Select ({checked.length})
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SelectCasesModal;
