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
            <thead>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Description</th>
                <th>Test Cases</th>
                <th className="actions-column">Actions</th>
            </tr>
            </thead>
            <tbody>
            {projects.length === 0 ? (
                <tr>
                    <td colSpan={5} className="text-center no-data">
                        <span>No projects</span>
                    </td>
                </tr>
            ) : (
                projects.map(p => (
                    <tr key={p.id}>
                        <td>{p.code}</td>
                        <td>
                            <button className="btn btn-link" onClick={() => onOpen(p.id)}>
                                {p.name}
                            </button>
                        </td>
                        <td>{p.description}</td>
                        <td>{p.testCasesCount ?? 0}</td>
                        <td className="text-center">
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => onEdit(p)}>
                                Edit
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(p)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            )}
            </tbody>
        </table>
    );
}
