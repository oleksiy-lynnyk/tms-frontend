// src/components/common/StatusSelect.tsx
import React from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

const statusOptions = [
    'Not Started',
    'In Progress',
    'Completed',
    'Blocked',
    'Aborted',
];

const StatusSelect: React.FC<Props> = ({ value, onChange, disabled, className }) => {
    return (
        <select
            className={`form-select ${className || ''}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
        >
            <option value="">Select status</option>
            {statusOptions.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default StatusSelect;
