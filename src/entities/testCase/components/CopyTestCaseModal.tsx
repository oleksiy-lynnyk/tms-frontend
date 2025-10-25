// src/components/testCase/CopyTestCaseModal.tsx
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { fetchSuitesTree } from '../../testSuite/api/testSuiteApi'
import type { TestSuiteDTO } from '@/entities/testSuite/types/testSuiteTypes'

function flatten(tree: TestSuiteDTO[]): TestSuiteDTO[] {
    const flat: TestSuiteDTO[] = []
    const recur = (nodes: TestSuiteDTO[]) => {
        for (const node of nodes) {
            flat.push(node)
            if (node.children && node.children.length > 0) recur(node.children)
        }
    }
    recur(tree)
    return flat
}

interface Props {
    show: boolean
    onClose: () => void
    onCopy: (targetSuiteId: string) => Promise<void> | void
    selectedCount: number
    projectId: string
}

const CopyTestCaseModal: React.FC<Props> = ({
                                                show,
                                                onClose,
                                                onCopy,
                                                selectedCount,
                                                projectId,
                                            }) => {
    const [suites, setSuites] = useState<TestSuiteDTO[]>([])
    const [targetId, setTargetId] = useState<string | null>(null)

    useEffect(() => {
        if (!show) return
        fetchSuitesTree(projectId)
            .then(tree => setSuites(flatten(tree)))
            .catch(() => setSuites([]))
    }, [show, projectId])

    const handleSubmit = async () => {
        if (!targetId) return
        await onCopy(targetId)
        onClose()
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Copy {selectedCount} Test Case{selectedCount > 1 ? 's' : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select target suite</Form.Label>
                        <Form.Control
                            as="select"
                            value={targetId ?? ''}
                            onChange={e => setTargetId(e.target.value)}
                        >
                            <option value="" disabled>
                                Select suite
                            </option>
                            {suites.map(suite => (
                                <option key={suite.id} value={suite.id}>
                                    {suite.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!targetId}
                >
                    Copy
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CopyTestCaseModal
