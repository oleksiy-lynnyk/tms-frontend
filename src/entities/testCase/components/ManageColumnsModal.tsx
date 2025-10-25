import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

type ColumnKey = string; // Якщо у тебе є окремий type, заміни тут

interface Props {
    show: boolean;
    onClose: () => void;
    columns: Record<ColumnKey, boolean>;
    onToggle: (k: ColumnKey) => void;
    onReset: () => void;
}

const COLUMN_LABELS: Record<ColumnKey, string> = {
    select: 'Select',
    code: 'Code',
    title: 'Title',
    priority: 'Priority',
    owner: 'Owner',
    tags: 'Tags',
    state: 'State',
    type: 'Type',
    automationStatus: 'Automation',
    component: 'Component',
    requirement: 'Requirement',
    projectId: 'Project',
    preconditions: 'Preconditions',
    description: 'Description',
    steps: 'Steps',
    expectedResult: 'Expected Result',
    useCase: 'Use Case',
    suiteId: 'Suite ID'
};
const ManageColumnsModal: React.FC<Props> = ({
                                                 show, onClose, columns, onToggle, onReset
                                             }) => (
    <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Manage Columns</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {Object.entries(columns).map(([key, value]) => (
                <Form.Check
                    key={key}
                    type="checkbox"
                    id={`col-${key}`}
                    label={COLUMN_LABELS[key as ColumnKey] ?? key}
                    checked={value}
                    onChange={() => onToggle(key as ColumnKey)}
                    className="mb-2"
                />
            ))}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onReset}>Reset to default</Button>
            <Button variant="primary" onClick={onClose}>Done</Button>
        </Modal.Footer>
    </Modal>
);

export default ManageColumnsModal;
