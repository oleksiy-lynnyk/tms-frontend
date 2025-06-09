// src/components/common/EntityToolbar.tsx
import React from 'react';

interface EntityToolbarProps {
    title: string;
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    showAddButton?: boolean;
    addButtonLabel?: string;
    onAdd?: () => void;
    children?: React.ReactNode; // додаткові дії (Import, Filters...)
}

const EntityToolbar: React.FC<EntityToolbarProps> = ({
                                                         title,
                                                         onSearch,
                                                         searchPlaceholder = 'Пошук...',
                                                         showAddButton = true,
                                                         addButtonLabel = 'Додати',
                                                         onAdd,
                                                         children,
                                                     }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3 app-header">
            <div className="d-flex align-items-center gap-3">
                <h2 className="mb-0 app-font" style={{ fontSize: 20 }}>{title}</h2>
                {onSearch && (
                    <input
                        type="text"
                        className="form-control app-font"
                        style={{ fontSize: 14, width: 240 }}
                        placeholder={searchPlaceholder}
                        onChange={e => onSearch(e.target.value)}
                    />
                )}
            </div>

            <div className="d-flex align-items-center gap-2">
                {children}
                {showAddButton && onAdd && (
                    <button
                        className="btn btn-outline-secondary btn-sm app-font"
                        style={{ fontSize: 14 }}
                        onClick={onAdd}
                    >
                        {addButtonLabel}
                    </button>
                )}
            </div>
        </div>
    );
};

export default EntityToolbar;