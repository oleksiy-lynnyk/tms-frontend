// src/entities/testSuite/components/FoldersTreeSidebar.tsx
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from 'lucide-react';
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

    // Стан для expand/collapse
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    // Стан для context menu
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; suite: TestSuiteDTO } | null>(null);

    // Стан для drag & drop
    const [draggedSuite, setDraggedSuite] = useState<TestSuiteDTO | null>(null);
    const [dragOverSuite, setDragOverSuite] = useState<string | null>(null);

    // Стан для hover
    const [hoveredSuite, setHoveredSuite] = useState<string | null>(null);

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

    // Toggle expand/collapse
    const toggleExpand = (suiteId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(suiteId)) {
                newSet.delete(suiteId);
            } else {
                newSet.add(suiteId);
            }
            return newSet;
        });
    };

    // Context menu handlers
    const handleContextMenu = (e: React.MouseEvent, suite: TestSuiteDTO) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({ x: e.clientX, y: e.clientY, suite });
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    // Drag & Drop handlers
    const handleDragStart = (e: React.DragEvent, suite: TestSuiteDTO) => {
        setDraggedSuite(suite);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, suiteId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedSuite && draggedSuite.id !== suiteId) {
            setDragOverSuite(suiteId);
        }
    };

    const handleDragLeave = () => {
        setDragOverSuite(null);
    };

    const handleDrop = async (e: React.DragEvent, targetSuite: TestSuiteDTO) => {
        e.preventDefault();
        e.stopPropagation();

        if (draggedSuite && draggedSuite.id !== targetSuite.id) {
            // Перевірка чи не намагаємось перемістити батька в нащадка
            const isDescendant = (parent: TestSuiteDTO, childId: string): boolean => {
                if (parent.id === childId) return true;
                if (!parent.children) return false;
                return parent.children.some(child => isDescendant(child, childId));
            };

            if (!isDescendant(draggedSuite, targetSuite.id)) {
                await updateSuite(draggedSuite.id, {
                    ...draggedSuite,
                    parentId: targetSuite.id
                });
                await loadSuites();
            } else {
                alert('Cannot move a suite into its own descendant');
            }
        }

        setDraggedSuite(null);
        setDragOverSuite(null);
    };

    const handleDragEnd = () => {
        setDraggedSuite(null);
        setDragOverSuite(null);
    };

    // Close context menu on click outside
    useEffect(() => {
        if (contextMenu) {
            const handleClick = () => closeContextMenu();
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [contextMenu]);

    const hasChildren = (suite: TestSuiteDTO) => suite.children && suite.children.length > 0;

    const renderTree = (nodes: TestSuiteDTO[], depth = 0): JSX.Element => (
        <div>
            {nodes.map((suite) => {
                const isExpanded = expandedIds.has(suite.id);
                const children = hasChildren(suite);
                const isActive = suite.id === selectedSuite;
                const isDragOver = dragOverSuite === suite.id;
                const isHovered = hoveredSuite === suite.id;

                return (
                    <div key={suite.id}>
                        <div
                            className={`suite-item ${isActive ? 'active' : ''} ${isDragOver ? 'drag-over' : ''}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, suite)}
                            onDragOver={(e) => handleDragOver(e, suite.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, suite)}
                            onDragEnd={handleDragEnd}
                            onClick={() => onSelectSuite(suite.id)}
                            onContextMenu={(e) => handleContextMenu(e, suite)}
                            onMouseEnter={() => setHoveredSuite(suite.id)}
                            onMouseLeave={() => setHoveredSuite(null)}
                            style={{
                                paddingLeft: 8 + depth * 16,
                                paddingRight: 8,
                                cursor: 'pointer',
                                userSelect: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '9px 8px',
                                margin: '2px 10px',
                                borderRadius: '8px',
                                backgroundColor: isActive ? '#e5e7eb' : isDragOver ? '#f0f8ff' : isHovered ? '#f3f6fa' : 'transparent',
                                color: isActive ? '#2563eb' : '#222222',
                                transition: 'background 0.15s, color 0.15s',
                                fontWeight: isActive ? 600 : 500,
                            }}
                        >
                            {/* Chevron для expand/collapse */}
                            {children ? (
                                <span
                                    onClick={(e) => toggleExpand(suite.id, e)}
                                    style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        width: 16,
                                        height: 16,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: isActive ? '#2563eb' : '#9ca3af'
                                    }}
                                >
                                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </span>
                            ) : (
                                <span style={{ width: 16 }} />
                            )}

                            {/* Іконка папки або файлу */}
                            <span style={{ display: 'flex', alignItems: 'center', color: isActive ? '#2563eb' : '#9ca3af' }}>
                                {children ? (
                                    isExpanded ? <FolderOpen size={18} /> : <Folder size={18} />
                                ) : (
                                    <FileText size={18} />
                                )}
                            </span>

                            {/* Назва с'юта */}
                            <span style={{ flex: 1, fontSize: '14px' }}>{suite.name}</span>

                            {/* Лічильник тест кейсів */}
                            {(suite.testCaseCount !== undefined && suite.testCaseCount > 0) && (
                                <span
                                    style={{
                                        fontSize: '12px',
                                        color: isActive ? '#2563eb' : '#9ca3af',
                                        fontWeight: 500,
                                        minWidth: '20px',
                                        textAlign: 'right'
                                    }}
                                >
                                    {suite.testCaseCount}
                                </span>
                            )}
                        </div>

                        {/* Рекурсивно показуємо дітей, якщо розгорнуто */}
                        {children && isExpanded && renderTree(suite.children!, depth + 1)}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="folders-sidebar">
            <div className="d-flex justify-content-between align-items-center px-2 py-1">
                <strong>Suites</strong>
                <Button size="sm" variant="outline-primary" onClick={() => handleAdd(null)}>＋</Button>
            </div>
            <div className="suites-list">{renderTree(suites)}</div>

            {/* Context Menu */}
            {contextMenu && (
                <div
                    style={{
                        position: 'fixed',
                        top: contextMenu.y,
                        left: contextMenu.x,
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        zIndex: 1000,
                        minWidth: '150px',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="context-menu-item"
                        style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                        onClick={() => {
                            handleAdd(contextMenu.suite.id);
                            closeContextMenu();
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        Add child
                    </div>
                    <div
                        className="context-menu-item"
                        style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                        onClick={() => {
                            handleEdit(contextMenu.suite);
                            closeContextMenu();
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        Edit
                    </div>
                    <div
                        className="context-menu-item"
                        style={{ padding: '8px 12px', cursor: 'pointer', color: '#dc3545' }}
                        onClick={() => {
                            setDeleteId(contextMenu.suite.id);
                            closeContextMenu();
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        Delete
                    </div>
                </div>
            )}

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
