import React from 'react';
import type { ProjectDTO } from '../types/projectTypes';

interface Props {
    projects: ProjectDTO[];
    onEdit: (p: ProjectDTO) => void;
    onDelete: (p: ProjectDTO) => void;
    onOpen: (id: string) => void;
}

export default function ProjectTable({ projects, onEdit, onDelete, onOpen }: Props) {
    return (
        <table className="app-table">
            {/* header */}
            <tbody>
            {projects.map(p => (
                <tr key={p.id}>
                    <td>{p.code}</td>
                    <td>
                        <button onClick={() => onOpen(p.id)}>{p.name}</button>
                    </td>
                    <td>{p.description}</td>
                    <td>{p.testCasesCount ?? 0}</td>
                    <td>
                        <button onClick={() => onEdit(p)}>Edit</button>
                        <button onClick={() => onDelete(p)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
