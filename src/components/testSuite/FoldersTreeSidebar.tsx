// src/components/testSuite/FoldersTreeSidebar.tsx
import React, { FC, useState, useEffect, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { Button, Spinner, Dropdown } from 'react-bootstrap'
import {
    fetchSuitesTree,
    createSuite,
    updateSuite,
    deleteSuite,
} from '../../api/testSuiteApi'
import type { TestSuiteDTO } from '../../types'
import SuiteModal from './SuiteModal'
import {
    Folder as FolderIcon,
    FolderOpen as FolderOpenIcon,
    File as FileIcon,
    MoreVertical as MoreIcon,
} from 'lucide-react'
import './FoldersTreeSidebar.css'

export interface Props {
    projectId: string;
    selected?: TestSuiteDTO | null;
    onSelectSuite: (suite: TestSuiteDTO | null) => void;
    onDeleteSuite: (suite: TestSuiteDTO | null) => void;
    refreshFlag: number;
    collapsed: boolean;
}

const MIN_WIDTH = 200
const MAX_WIDTH = 480

const CustomToggle = React.forwardRef<
    HTMLButtonElement,
    { onClick(e: ReactMouseEvent<HTMLButtonElement>): void; children?: React.ReactNode }
>(({ onClick, children }, ref) => (
    <button
        ref={ref}
        className="suite-menu-btn"
        onClick={e => {
            e.stopPropagation()
            onClick(e)
        }}
    >
        {children}
    </button>
))
CustomToggle.displayName = 'CustomToggle'

const FoldersTreeSidebar: FC<Props> = ({
                                           projectId,
                                           selected,
                                           onSelectSuite,
                                           onDeleteSuite,
                                           refreshFlag,
                                           collapsed,
                                       }) => {
    const [suites, setSuites] = useState<TestSuiteDTO[]>([])
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState<Set<string>>(new Set())
    const [modalSuite, setModalSuite] = useState<TestSuiteDTO | undefined>()
    const [showModal, setShowModal] = useState(false)
    const [width, setWidth] = useState(240)
    const resizingRef = useRef(false)

    const fetchSuites = async () => {
        setLoading(true);
        try {
            const res = await fetchSuitesTree(projectId); // ← передаєш projectId!
            setSuites(res);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchSuites()
        return () => {
            resizingRef.current = false
        }
    }, [refreshFlag])

// FoldersTreeSidebar.tsx (після useEffect, який fetchSuites)
    useEffect(() => {
        if (suites.length > 0 && (!selected || !findSuiteById(suites, selected?.id))) {
            // Функція шукає перший leaf-сьют
            const findFirst = (nodes: TestSuiteDTO[]): TestSuiteDTO => {
                let current = nodes[0];
                while (current.children && current.children.length > 0) {
                    current = current.children[0];
                }
                return current;
            };
            onSelectSuite(findFirst(suites));
        }
        // eslint-disable-next-line
    }, [suites]);

// Додатково (допоміжна функція)
    function findSuiteById(nodes: TestSuiteDTO[], id: string | undefined): boolean {
        if (!id) return false;
        for (const node of nodes) {
            if (node.id === id) return true;
            if (node.children && node.children.length > 0) {
                if (findSuiteById(node.children, id)) return true;
            }
        }
        return false;
    }

    const toggle = (id: string) => {
        setExpanded(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const renderNode = (node: TestSuiteDTO, level = 0) => {
        const isOpen = expanded.has(node.id)
        const isSelected = selected?.id === node.id

        return (
            <div
                key={node.id}
                className={`suite-node${isSelected ? ' selected' : ''}`}
                style={{ paddingLeft: level * 16 }}
            >
                <div className="suite-row">
                    <span className="suite-icon" onClick={() => toggle(node.id)}>
                        {node.children?.length
                            ? isOpen
                                ? <FolderOpenIcon size={16} />
                                : <FolderIcon size={16} />
                            : <FileIcon size={16} />}
                    </span>
                    <span
                        className="suite-name"
                        title={`${node.name} (${node.testCaseCount ?? 0})`}
                        onClick={() => onSelectSuite(node)}
                    >
                        {node.name} ({node.testCaseCount ?? 0})
                    </span>

                    <Dropdown drop="end" className="suite-menu" onClick={e => e.stopPropagation()}>
                        <Dropdown.Toggle as={CustomToggle}>
                            <MoreIcon size={16} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setModalSuite(node); setShowModal(true) }}>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={async () => {
                                await deleteSuite(node.id)
                                onDeleteSuite(node)
                                await fetchSuites()
                            }}>
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {isOpen && node.children?.map(child => renderNode(child, level + 1))}
            </div>
        )
    }

    return (
        <div className="sidebar-container" style={{ width: collapsed ? 64 : width }}>
            {/* Додаємо шапку з кнопкою "+ New" */}
            <div className="sidebar-header d-flex align-items-center justify-content-between">
                <h5 className="m-0">Folders</h5>
                <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                        setModalSuite(undefined)
                        setShowModal(true)
                    }}
                >
                    + New
                </Button>
            </div>

            <div className="sidebar-content">
                {loading
                    ? <div className="text-center py-4"><Spinner animation="border" /></div>
                    : suites.map(s => renderNode(s))
                }
            </div>
            <div className="sidebar-resizer" onMouseDown={() => { resizingRef.current = true }} />
            <SuiteModal
                show={showModal}
                suite={modalSuite}
                allSuites={suites}
                onClose={() => setShowModal(false)}
                onSave={async dto => {
                    const { id, ...payload } = dto
                    if (id) {
                        await updateSuite(id, { ...payload, projectId })
                    } else {
                        await createSuite({ ...payload, projectId })
                    }
                    setShowModal(false)
                    await fetchSuites()
                }}
            />
        </div>
    )
}

export default FoldersTreeSidebar
