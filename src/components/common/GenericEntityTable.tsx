import React from 'react';
import { Table } from 'react-bootstrap';
import { ChevronUp, ChevronDown } from 'lucide-react';
import TablePaginationFooter from './TablePaginationFooter';

export interface ColumnDefinition<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
}

interface GenericEntityTableProps<T> {
    columns: ColumnDefinition<T>[];
    items: T[];
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    pageSizeOptions?: number[];
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
    onSortChange?: (sortBy: string, sortDir: 'asc' | 'desc') => void;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    onEdit: (item: T) => void;
    onDelete: (id: string) => void;
}

export default function GenericEntityTable<T extends { id: string }>({
                                                                         columns,
                                                                         items,
                                                                         currentPage,
                                                                         pageSize,
                                                                         totalElements,
                                                                         totalPages,
                                                                         pageSizeOptions = [5, 10, 20, 50],
                                                                         sortBy,
                                                                         sortDir,
                                                                         onSortChange,
                                                                         onPageChange,
                                                                         onPageSizeChange,
                                                                         onEdit,
                                                                         onDelete,
                                                                     }: GenericEntityTableProps<T>) {
    const startItem = currentPage * pageSize;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    return (
        <div className="generic-table-container">
            <div className="table-wrapper">
                <Table>
                    <thead>
                    <tr>
                        {columns.map(col => (
                            <th
                                key={col.key as string}
                                style={col.sortable ? { cursor: 'pointer', userSelect: 'none' } : undefined}
                                onClick={
                                    col.sortable && onSortChange
                                        ? () => {
                                            if (sortBy === col.key) {
                                                onSortChange(col.key as string, sortDir === 'asc' ? 'desc' : 'asc');
                                            } else {
                                                onSortChange(col.key as string, 'asc');
                                            }
                                        }
                                        : undefined
                                }
                            >
                                {col.label}
                                {col.sortable && sortBy === col.key && (
                                    sortDir === 'asc' ? (
                                        <ChevronUp size={13} style={{ marginLeft: 4, marginBottom: 1 }} />
                                    ) : (
                                        <ChevronDown size={13} style={{ marginLeft: 4, marginBottom: 1 }} />
                                    )
                                )}
                            </th>
                        ))}
                        <th className="actions-column">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center no-data">
                                <span>No data</span>
                            </td>
                        </tr>
                    ) : (
                        items.map(item => (
                            <tr key={item.id}>
                                {columns.map(col => (
                                    <td key={col.key as string}>
                                        {col.render ? col.render(item) : String(item[col.key])}
                                    </td>
                                ))}
                                <td className="text-center">
                                    <div className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-outline-secondary btn-sm" onClick={() => onEdit(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(item.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </div>

            <TablePaginationFooter
                currentPage={currentPage}
                pageSize={pageSize}
                pageSizeOptions={pageSizeOptions}
                totalElements={totalElements}
                totalPages={totalPages}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                startItem={startItem}
                endItem={endItem}
            />
        </div>
    );
}
