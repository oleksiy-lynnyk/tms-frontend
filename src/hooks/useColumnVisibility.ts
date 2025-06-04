// src/hooks/useColumnVisibility.js
import { useState, useEffect } from 'react';
import {ColumnKey} from "@/types";

const defaultColumns = {
    // id: true,               // ← Видалено!
    code: true,                // ← Додаємо як основну колонку
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
