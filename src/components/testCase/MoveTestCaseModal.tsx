// src/components/testCase/MoveTestCaseModal.tsx
import React, { FC, useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { getSuitesTree } from '../../api/testSuiteApi'

interface SuiteNode {
    id: number
    name: string
    children?: SuiteNode[]
}

interface Props {
    show: boolean
    onClose: () => void
    /** Викликається з цільовим suiteId — кейси будуть у нього переміщені */
    onMove: (targetSuiteId: number) => Promise<void> | void
    selectedCount: number
}

const flatten = (nodes: SuiteNode[], out: SuiteNode[] = []): SuiteNode[] =>
    nodes.reduce((acc, n) => {
        acc.push(n)
        if (n.children) flatten(n.children, acc)
        return acc
    }, out)

const MoveTestCaseModal: FC<Props> = ({
                                          show,
                                          onClose,
                                          onMove,
                                          selectedCount,
                                      }) => {
    const [suites, setSuites] = useState<SuiteNode[]>([])
    const [targetId, setTargetId] = useState<number>()

    useEffect(() => {
        if (!show) return
        getSuitesTree()
            .then(res => setSuites(flatten(res.data || [])))
            .catch(() => setSuites([]))
    }, [show])

    const handleSubmit = async () => {
        if (targetId == null) return
        await onMove(targetId)
        onClose()
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Move Test Cases ({selectedCount})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="move-target-suite">
                    <Form.Label>Select destination Test Suite</Form.Label>
                    <Form.Select
                        value={targetId ?? ''}
                        onChange={e => setTargetId(Number(e.target.value))}
                    >
                        <option value="">— choose suite —</option>
                        {suites.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-end">
                <Button variant="outline-secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={targetId == null}
                >
                    Move
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MoveTestCaseModal

