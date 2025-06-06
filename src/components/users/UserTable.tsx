// src/components/user/UserTable.tsx
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import type { UserFullDTO } from '../../types';

interface Props {
    users: UserFullDTO[];
    onEdit: (user: UserFullDTO) => void;
    onDelete: (user: UserFullDTO) => void;
}

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete }) => (
    <Table bordered hover className="w-100">
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: 170 }}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {users.length === 0 ? (
            <tr>
                <td colSpan={4} className="text-center text-muted">No users found</td>
            </tr>
        ) : (
            users.map(user => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => onEdit(user)}
                        >Edit</Button>
                        {' '}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onDelete(user)}
                        >Delete</Button>
                    </td>
                </tr>
            ))
        )}
        </tbody>
    </Table>
);

export default UserTable;
