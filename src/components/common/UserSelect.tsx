// src/components/common/UserSelect.tsx
import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { getUsersPaged } from '../../entities/users/api/userApi';
import type { AppUserShortDTO  } from '@/entities/users/types/userTypes';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const UserSelect: React.FC<Props> = ({ value, onChange }) => {
    const [users, setUsers] = useState<AppUserShortDTO []>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const result = await getUsersPaged();
                setUsers(result.content || []);
            } catch (e) {
                console.error('Failed to load users', e);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    return (
        <Form.Group controlId="assignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Select value={value} onChange={e => onChange(e.target.value)} disabled={loading}>
                <option value="">-- Select a user --</option>
                {loading ? (
                    <option disabled>Loading...</option>
                ) : (
                    users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))
                )}
            </Form.Select>
        </Form.Group>
    );
};

export default UserSelect;
