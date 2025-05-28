// src/components/testSuite/SuiteModal.tsx
import React, { FC, useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import type { TestSuiteDTO } from '../../types'

export interface SuiteModalProps {
    show: boolean
    suite?: TestSuiteDTO           // undefined → створюємо новий
    allSuites: TestSuiteDTO[]      // плоский масив для селектора батька
    onClose: () => void
    onSave: (payload: {
        id?: string
        name: string
        description?: string
        parentId?: string | null
    }) => Promise<void> | void
}

const SuiteModal: FC<SuiteModalProps> = ({
                                             show,
                                             suite,
                                             allSuites,
                                             onClose,
                                             onSave,
                                         }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [parentId, setParentId] = useState<string | null>(null)

    useEffect(() => {
        if (show) {
            setName(suite?.name ?? '')
            setDescription(suite?.description ?? '')
            setParentId(suite?.parentId ?? null)
        }
    }, [show, suite])

    const handleSubmit = async () => {
        if (!name.trim()) return
        await onSave({
            id: suite?.id,
            name: name.trim(),
            description: description.trim() || undefined,
            parentId,
        })
    }

    return (
        <Modal show={show} onHide={onClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    {suite ? 'Edit Test Suite' : 'New Test Suite'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="suite-name">
                        <Form.Label>Suite Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter suite name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="suite-desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Optional description"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="suite-parent">
                        <Form.Label>Parent Folder</Form.Label>
                        <Form.Select
                            value={parentId ?? ''}
                            onChange={e =>
                                setParentId(e.target.value || null)
                            }
                        >
                            <option value="">(No parent)</option>
                            {allSuites
                                .filter(s => s.id !== suite?.id)
                                .map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-end">
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {suite ? 'Update' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SuiteModal
