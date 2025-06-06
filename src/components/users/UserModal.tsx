// src/components/user/UserModal.tsx
// src/components/user/UserModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { UserFullDTO } from '../../types';

interface UserModalProps {
    show: boolean;
    user?: UserFullDTO;
    onClose: () => void;
    onSave: (dto: Omit<UserFullDTO, 'id'>, id?: string) => void;
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

    useEffect(() => {
        if (show) {
            setName(user?.name ?? '');
            setEmail(user?.email ?? '');
            setRole(user?.role ?? ROLES[1].value);
        }
    }, [show, user]);

    const handleSubmit = () => {
        if (!name.trim() || !email.trim()) return;
        onSave({ name: name.trim(), email: email.trim(), role: role }, user?.id);
    };

    return (
        <Modal show={show} onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{user?.id ? 'Edit' : 'New'} User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                        placeholder="Enter full name"
                    />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </Form.Group>
                <Form.Group className="mt-3">
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {user?.id ? 'Update' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserModal;

