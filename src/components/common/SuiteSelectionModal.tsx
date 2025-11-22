import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchSuitesTree } from '../../entities/testSuite/api/testSuiteApi';
import type { TestSuiteDTO } from '@/entities/testSuite/types/testSuiteTypes';

function flattenSuiteTree(tree: TestSuiteDTO[]): TestSuiteDTO[] {
    const flat: TestSuiteDTO[] = [];
    const recur = (nodes: TestSuiteDTO[]) => {
        for (const node of nodes) {
            flat.push(node);
            if (node.children && node.children.length > 0) recur(node.children);
        }
    };
    recur(tree);
    return flat;
}

interface Props {
    show: boolean;
    onClose: () => void;
    onConfirm: (targetSuiteId: string) => Promise<void> | void;
    selectedCount: number;
    projectId: string;
    action: 'move' | 'copy';
}

const SuiteSelectionModal: React.FC<Props> = ({
    show,
    onClose,
    onConfirm,
    selectedCount,
    projectId,
    action,
}) => {
    const [suites, setSuites] = useState<TestSuiteDTO[]>([]);
    const [targetId, setTargetId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!show) return;
        setIsLoading(true);
        fetchSuitesTree(projectId)
            .then(tree => setSuites(flattenSuiteTree(tree)))
            .catch(() => setSuites([]))
            .finally(() => setIsLoading(false));
    }, [show, projectId]);

    const handleSubmit = async () => {
        if (!targetId) return;
        await onConfirm(targetId);
        onClose();
    };

    const actionLabel = action === 'move' ? 'Move' : 'Copy';
    const title = `${actionLabel} ${selectedCount} Test Case${selectedCount > 1 ? 's' : ''}`;

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select target suite</Form.Label>
                        <Form.Control
                            as="select"
                            value={targetId ?? ''}
                            onChange={e => setTargetId(e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="" disabled>
                                {isLoading ? 'Loading suites...' : 'Select suite'}
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
                    disabled={!targetId || isLoading}
                >
                    {actionLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuiteSelectionModal;