// src/components/testRun/TestRunModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {TestRun} from "@/types/testRun";


type StatusType = 'Not Started' | 'In Progress' | 'Completed' | 'Blocked' | 'Aborted';

interface Props {
    show: boolean;
    run?: Partial<TestRun>;
    onSave: (dto: Partial<TestRun>) => void;
    onClose: () => void;
}

const STATUS_OPTIONS: StatusType[] = [
    'Not Started', 'In Progress', 'Completed', 'Blocked', 'Aborted'
];

export default function TestRunModal({ show, run, onSave, onClose }: Props) {
    const [name, setName] = useState(run?.name || '');
    const [description, setDescription] = useState(run?.description || '');
    const [status, setStatus] = useState<StatusType>(run?.status as StatusType || 'Not Started');

    useEffect(() => {
        setName(run?.name || '');
        setDescription(run?.description || '');
        setStatus(run?.status as StatusType || 'Not Started');
    }, [run, show]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...run,
            name,
            description,
            status
        });
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{run?.id ? 'Edit Test Run' : 'Create Test Run'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name*</Form.Label>
                        <Form.Control value={name} onChange={e => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select value={status} onChange={e => setStatus(e.target.value as StatusType)}>
                            {STATUS_OPTIONS.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {run?.id ? 'Save Changes' : 'Create'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

