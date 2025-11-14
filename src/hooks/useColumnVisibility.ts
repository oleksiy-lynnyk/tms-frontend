import { useState } from 'react';
import type { ColumnKey } from '../types';

const defaultColumns: Partial<Record<ColumnKey, boolean>> = {
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
    select: false,
    projectId: false,
    preconditions: false,
    description: false,
    steps: false,
    expectedResult: false,
    useCase: false,
    suiteId: false
};

export default function useColumnVisibility() {
    const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>(() => {
        const raw = localStorage.getItem('visibleColumns');
        const parsed = raw ? JSON.parse(raw) : {};
        // merge defaults with stored values; cast because ColumnKey is a type-only construct
        return { ...(defaultColumns as Record<string, boolean>), ...(parsed as Record<string, boolean>) } as Record<ColumnKey, boolean>;
    });

    const toggleColumn = (key: ColumnKey) => {
        const updated = { ...visibleColumns, [key]: !visibleColumns[key] };
        setVisibleColumns(updated);
        localStorage.setItem('visibleColumns', JSON.stringify(updated));
    };

    return {
        visibleColumns,
        toggleColumn
    };
}
