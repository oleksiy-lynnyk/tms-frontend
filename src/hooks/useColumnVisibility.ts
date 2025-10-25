import { useState } from 'react';
// Якщо є тип ColumnKey:
import type { ColumnKey } from '../types';

const defaultColumns: Record<string, boolean> = {
    code: true,
    title: true,
    priority: true,
    owner: true,
    tags: true,
    state: true,
    type: true,
    automationStatus: true,
    component: true,
    requirement: true,
};

export default function useColumnVisibility() {
    const [visibleColumns, setVisibleColumns] = useState(() => {
        const raw = localStorage.getItem('visibleColumns');
        return raw ? JSON.parse(raw) : defaultColumns;
    });

    // Якщо тип є — використовуй ColumnKey, якщо ні — string
    const toggleColumn = (key: string) => {
        const updated = { ...visibleColumns, [key]: !visibleColumns[key] };
        setVisibleColumns(updated);
        localStorage.setItem('visibleColumns', JSON.stringify(updated));
    };

    return {
        visibleColumns,
        toggleColumn
    };
}
