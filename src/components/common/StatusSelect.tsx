import React from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const statusOptions = [
    'Not Started',
    'In Progress',
    'Completed',
    'Blocked',
    'Aborted',
];

const StatusSelect: React.FC<Props> = ({ value, onChange }) => {
    return (
        <Form.Select value={value} onChange={e => onChange(e.target.value)}>
            <option value="">-- Select status --</option>
            {statusOptions.map(status => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </Form.Select>
    );
};

export default StatusSelect;
