// src/components/configuration/ConfigurationTable.tsx
import React from 'react';
import type { ConfigurationDTO } from '../../types';
import type { ColumnDefinition } from '../common/GenericEntityTable';
import GenericEntityTable from '../common/GenericEntityTable';

interface Props {
    items: ConfigurationDTO[];
    onDelete: (id: string) => void;
    onEdit?: (item: ConfigurationDTO) => void;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    onPageChange: (p: number) => void;
}

const columns: ColumnDefinition<ConfigurationDTO>[] = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'slug', label: 'Slug', sortable: true },
    { key: 'description', label: 'Description', sortable: true, className: 'text-muted' },
];

const ConfigurationTable: React.FC<Props> = ({
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

export default ConfigurationTable;
