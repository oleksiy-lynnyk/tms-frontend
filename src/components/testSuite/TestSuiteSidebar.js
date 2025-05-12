// src/components/testSuite/TestSuiteSidebar.js

import React, { useEffect, useState } from 'react'
import {
    getSuitesTree,
    createSuite,
    updateSuite,
    deleteSuite
} from '../../api/testSuiteApi'
import TestSuiteModal from './TestSuiteModal'
import TestSuiteHeader from './TestSuiteHeader'
import { Button } from 'react-bootstrap'

// Рендер дерева папок
const renderTree = (
    nodes,
    depth,
    selected,
    onSelect,
    onEdit,
    onDelete,
    expandedIds,
    toggleExpand
) =>
    nodes.map(node => {
        const hasChildren = node.children && node.children.length > 0
        const isExpanded = expandedIds.has(node.id)

        return (
            <React.Fragment key={node.id}>
                <li
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                        selected?.id === node.id ? 'active' : ''
                    }`}
                    style={{ paddingLeft: 16 + depth * 16, cursor: 'pointer' }}
                >
                    <div
                        className="d-flex align-items-center flex-grow-1"
                        onClick={() => onSelect(node)}
                    >
                        {hasChildren ? (
                            <span
                                onClick={e => {
                                    e.stopPropagation()
                                    toggleExpand(node.id)
                                }}
                                style={{ width: 16, userSelect: 'none' }}
                            >
                {isExpanded ? '▼' : '▶'}
              </span>
                        ) : (
                            <span style={{ width: 16 }} />
                        )}

                        <span
                            className="truncate-ellipsis ms-2 flex-grow-1"
                            title={node.name}
                            style={{ minWidth: 0 }}
                        >
              📁 {node.name}
            </span>
                    </div>
                    <div>
                        <button
                            className="btn btn-sm btn-link p-0 me-2"
                            title="Edit"
                            onClick={e => {
                                e.stopPropagation()
                                onEdit(node)
                            }}
                        >
                            ✏️
                        </button>
                        <button
                            className="btn btn-sm btn-link text-danger p-0"
                            title="Delete"
                            onClick={e => {
                                e.stopPropagation()
                                onDelete(node)
                            }}
                        >
                            🗑️
                        </button>
                    </div>
                </li>

                {hasChildren && isExpanded && (
                    renderTree(
                        node.children,
                        depth + 1,
                        selected,
                        onSelect,
                        onEdit,
                        onDelete,
                        expandedIds,
                        toggleExpand
                    )
                )}
            </React.Fragment>
        )
    })

export default function TestSuiteSidebar({
                                             selected,
                                             onSelectSuite
                                         }) {
    const [tree, setTree] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState(null)
    const [expandedIds, setExpandedIds] = useState(new Set())
    const [isComponentMounted, setIsComponentMounted] = useState(true)

    // --- Завантажуємо дерево ---
    useEffect(() => {
        // Використовуємо змінну для відстеження стану компонента
        let isMounted = true;

        const loadTree = async () => {
            try {
                const res = await getSuitesTree()
                // Перевіряємо чи компонент досі змонтований перед оновленням стану
                if (isMounted) {
                    setTree(res.data || [])
                }
            } catch (err) {
                console.error(err)
            }
        }

        loadTree()

        // Функція очищення, яка виконується при розмонтуванні
        return () => {
            isMounted = false;
        }
    }, [])

    // --- Збереження папки ---
    const handleSave = async dto => {
        try {
            if (dto.id) await updateSuite(dto.id, dto)
            else await createSuite(dto)
            setShowModal(false)
            setEditing(null)

            // Завантажуємо дерево заново
            const res = await getSuitesTree()
            setTree(res.data || [])
        } catch (err) {
            console.error(err)
        }
    }

    // --- Видалення папки ---
    const handleDelete = async node => {
        if (
            !window.confirm(
                `Delete folder "${node.name}" and its children?`
            )
        )
            return
        try {
            await deleteSuite(node.id)

            // Завантажуємо дерево заново
            const res = await getSuitesTree()
            setTree(res.data || [])

            if (selected?.id === node.id) onSelectSuite(null)
        } catch (err) {
            console.error(err)
        }
    }

    // --- Expand / Collapse ---
    const toggleExpand = id => {
        setExpandedIds(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    // --- Рахуємо загальну кількість кейсів ---
    // якщо у вашій відповіді getSuitesTree кожен node має поле testCasesLength:
    // const totalCases = tree.reduce((sum, n) => sum + (n.testCasesLength||0), 0)
    // або якщо просто підрахувати кількість папок:
    const totalCases = tree.length

    return (
        <div className="sidebar-container app-font">
            {/* 1) Header із лічильником */}
            <TestSuiteHeader
                totalCount={totalCases}
                onAdd={() => {
                    setEditing(null)
                    setShowModal(true)
                }}
            />

            {/* 2) Скролимо тільки список */}
            <div className="sidebar-list">
                <ul className="list-group list-group-flush">
                    {renderTree(
                        tree,
                        0,
                        selected,
                        onSelectSuite,
                        node => {
                            setEditing(node)
                            setShowModal(true)
                        },
                        handleDelete,
                        expandedIds,
                        toggleExpand
                    )}
                </ul>
            </div>

            {/* 3) Модалка */}
            <TestSuiteModal
                show={showModal}
                suite={editing}
                allSuitesFlat={tree}
                onClose={() => {
                    setShowModal(false)
                    setEditing(null)
                }}
                onSave={handleSave}
            />
        </div>
    )
}