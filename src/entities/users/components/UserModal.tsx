import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (show) {
            setName(user?.username ?? '');
            setEmail(user?.email ?? '');
            setRole(user?.role ?? ROLES[1].value);
        }
    }, [show, user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;
        onSave({ username: name.trim(), email: email.trim(), role }, user?.id);
    };

    if (!show) return null;

    return (
        <div className="bs-modal-overlay">
            <form
                className="bs-modal-content"
                onSubmit={handleSubmit}
                style={{ minWidth: 380, maxWidth: 540 }}
            >
                <div className="bs-modal-header">
                    <div className="bs-modal-title">{user?.id ? 'Edit' : 'New'} User</div>
                    <button className="bs-close" onClick={onClose} type="button">×</button>
                </div>
                <div className="bs-modal-body">
                    <div className="bs-fields">
                        <div className="bs-field-row">
                            <div className="bs-field-actions">
                                <label className="bs-field-label">Name</label>
                                <input
                                    className="bs-action-select"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Enter full name"
                                    autoFocus
                                />
                            </div>
                            <div className="bs-field-actions">
                                <label className="bs-field-label">Email</label>
                                <input
                                    className="bs-action-select"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>
                        <div className="bs-field-row">
                            <div className="bs-field-actions" style={{ minWidth: 180 }}>
                                <label className="bs-field-label">Role</label>
                                <select
                                    className="bs-action-select"
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                >
                                    {ROLES.map(r => (
                                        <option key={r.value} value={r.value}>{r.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bs-modal-footer">
                    <button className="bs-btn bs-btn-outline" type="button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bs-btn bs-btn-primary" type="submit">
                        {user?.id ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserModal;
