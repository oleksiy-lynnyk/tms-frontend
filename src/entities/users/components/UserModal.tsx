import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import BaseFormModal from '../../../components/common/BaseFormModal';
import type { AppUserFullDTO } from '@/entities/users/types/userTypes';

interface UserModalProps {
    show: boolean;
    user?: AppUserFullDTO;
    onClose: () => void;
    onSave: (dto: Omit<AppUserFullDTO, 'id'>, id?: string) => void;
}

const ROLES = [
    { value: "ADMIN", label: "Admin" },
    { value: "QA", label: "QA" },
    { value: "VIEWER", label: "Viewer" },
];

const UserModal: React.FC<UserModalProps> = ({ show, user, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(ROLES[1].value);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (show) {
            setName(user?.fullName || user?.username || '');
            setEmail(user?.email ?? '');
            setRole(user?.role ?? ROLES[1].value);
        }
    }, [show, user]);

    const handleSave = async () => {
        if (!name.trim() || !email.trim()) return;

        setIsSaving(true);
        try {
            await onSave({
                username: name.trim(),
                fullName: name.trim(),
                email: email.trim(),
                role
            }, user?.id);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <BaseFormModal
            title={user?.id ? 'Edit User' : 'New User'}
            show={show}
            onClose={onClose}
            onSave={handleSave}
            form={{ name, email, role }}
            isSaving={isSaving}
        >
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter full name"
                        autoFocus
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        {ROLES.map(r => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>
        </BaseFormModal>
    );
};

export default UserModal;
