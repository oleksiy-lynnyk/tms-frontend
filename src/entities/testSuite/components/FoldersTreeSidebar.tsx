// src/entities/testSuite/components/FoldersTreeSidebar.tsx
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, ListGroup } from 'react-bootstrap';
import { fetchSuitesTree, createSuite, updateSuite, deleteSuite } from '../api/testSuiteApi';
import type { TestSuiteDTO } from '../types/testSuiteTypes';
import SuiteModal from './SuiteModal';
import DeleteModal from '../../../components/common/DeleteModal';

interface Props {
    projectId: string;
    selectedSuite: string | null;
    onSelectSuite: (id: string | null) => void;
}

const FoldersTreeSidebar: React.FC<Props> = ({ projectId, selectedSuite, onSelectSuite }) => {
    const [suites, setSuites] = useState<TestSuiteDTO[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editSuite, setEditSuite] = useState<TestSuiteDTO | undefined>();
    const [parentId, setParentId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const loadSuites = async () => {
        const data = await fetchSuitesTree(projectId);
        setSuites(data);
    };

    useEffect(() => {
        loadSuites();
    }, [projectId]);

    const handleAdd = (parentId?: string | null) => {
        setParentId(parentId ?? null);
        setEditSuite(undefined);
        setShowModal(true);
    };

    const handleEdit = (suite: TestSuiteDTO) => {
        setEditSuite(suite);
        setParentId(suite.parentId ?? null);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        await deleteSuite(id);
        await loadSuites();
    };

    const handleSave = async (data: Omit<TestSuiteDTO, 'id'>) => {
        const cleanData = {
            ...data,
            parentId: data.parentId || undefined,
        };

        if (editSuite) {
            await updateSuite(editSuite.id, cleanData);
        } else {
            await createSuite(cleanData);
        }
        await loadSuites();
    };

    const renderTree = (nodes: TestSuiteDTO[], depth = 0): JSX.Element => (
        <ListGroup>
            {nodes.map((suite) => (
                <ListGroup.Item
                    key={suite.id}
                    active={suite.id === selectedSuite}
                    action
                    onClick={() => onSelectSuite(suite.id)}
                    style={{ paddingLeft: 16 + depth * 12 }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <span>{suite.name}</span>
                        <Dropdown onClick={(e) => e.stopPropagation()}>
                            <Dropdown.Toggle size="sm" variant="outline-secondary">⋮</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleAdd(suite.id)}>Add child</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleEdit(suite)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => setDeleteId(suite.id)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {suite.children && suite.children.length > 0 && renderTree(suite.children, depth + 1)}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );

    return (
        <div className="folders-sidebar">
            <div className="d-flex justify-content-between align-items-center px-2 py-1">
                <strong>Suites</strong>
                <Button size="sm" variant="outline-primary" onClick={() => handleAdd(null)}>＋</Button>
            </div>
            <div className="suites-list">{renderTree(suites)}</div>

            {showModal && (
                <SuiteModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    suite={editSuite}
                    parentId={parentId}
                    projectId={projectId}
                    allSuites={suites}
                />
            )}

            <DeleteModal
                show={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (deleteId) {
                        await handleDelete(deleteId);
                        setDeleteId(null);
                    }
                }}
                itemName={suites.find((s) => s.id === deleteId)?.name}
            />
        </div>
    );
};

export default FoldersTreeSidebar;
