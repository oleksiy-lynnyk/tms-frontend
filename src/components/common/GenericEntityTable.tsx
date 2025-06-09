// src/components/common/GenericEntityTable.tsx
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TableFooter from './TableFooter';

export interface ColumnDefinition<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    className?: string;
}

interface Props<T> {
    items: T[];
    columns: ColumnDefinition<T>[];
    onDelete: (id: string) => void;
    onEdit?: (item: T) => void;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    onPageChange: (p: number) => void;
}

function GenericEntityTable<T extends { id?: string }>({
                                                           items,
                                                           columns,
                                                           onDelete,
                                                           onEdit,
                                                           page,
                                                           pageSize,
                                                           total,
                                                           totalPages,
                                                           onPageChange
                                                       }: Props<T>) {
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortAsc, setSortAsc] = useState(true);

    const handleSort = (key: keyof T) => {
        if (sortKey === key) {
            setSortAsc(!sortAsc);
        } else {
            setSortKey(key);
            setSortAsc(true);
        }
    };

    const sortedItems = sortKey
        ? [...items].sort((a, b) => {
            const aVal = a[sortKey] ?? '';
            const bVal = b[sortKey] ?? '';
            return sortAsc
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
        })
        : items;

    const startItem = total > 0 ? page * pageSize + 1 : 0;
    const endItem = Math.min((page + 1) * pageSize, total);

    return (
        <div className="d-flex flex-column">
            <div className="table-wrapper">
                <table className="table app-table table-bordered table-hover table-sm">
                    <thead>
                    <tr>
                        {columns.map(col => (
                            <th
                                key={String(col.key)}
                                className={col.className}
                                style={col.sortable ? { cursor: 'pointer' } : {}}
                                onClick={() => col.sortable && handleSort(col.key)}
                            >
                                {col.label}
                                {sortKey === col.key && (sortAsc ? ' ↑' : ' ↓')}
                            </th>
                        ))}
                        <th style={{ width: 120 }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedItems.map((item) => (
                        <tr key={item.id}>
                            {columns.map(col => (
                                <td
                                    key={String(col.key)}
                                    className={col.className}
                                >
                                    {String(item[col.key] ?? '')}
                                </td>
                            ))}
                            <td>
                                <div className="d-flex gap-2 justify-content-end">
                                    {onEdit && (
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                            className="app-font"
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => onDelete(item.id!)}
                                        className="app-font"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {items.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center text-muted">
                                No items found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <TableFooter
                startItem={startItem}
                endItem={endItem}
                total={total}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}

export default GenericEntityTable;
