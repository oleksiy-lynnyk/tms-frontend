// src/components/version/VersionTable.tsx
import React from 'react';
import type { VersionDTO } from '../../types';
import type { ColumnDefinition } from '../common/GenericEntityTable';
import GenericEntityTable from '../common/GenericEntityTable';

interface Props {
    items: VersionDTO[];
    onDelete: (id: string) => void;
    onEdit?: (item: VersionDTO) => void;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    onPageChange: (p: number) => void;
}

const columns: ColumnDefinition<VersionDTO>[] = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'slug', label: 'Slug', sortable: true },
    { key: 'description', label: 'Description', sortable: true, className: 'text-muted' },
];

const VersionTable: React.FC<Props> = ({
                                           items,
                                           onDelete,
                                           onEdit,
                                           page,
                                           pageSize,
                                           total,
                                           totalPages,
                                           onPageChange
                                       }) => {
    return (
        <GenericEntityTable
            items={items}
            columns={columns}
            onDelete={onDelete}
            onEdit={onEdit}
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            onPageChange={onPageChange}
        />
    );
};

export default VersionTable;
