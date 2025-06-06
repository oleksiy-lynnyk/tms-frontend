// src/components/common/PageHeader.tsx
// src/components/common/PageHeader.tsx
import React from 'react';

interface PageHeaderProps {
    title: string;                         // Наприклад: "Тест-рани"
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    addButtonLabel?: string;
    onAdd?: () => void;
    showAddButton?: boolean;
    children?: React.ReactNode;            // Для додаткових кнопок/контенту
}

const PageHeader: React.FC<PageHeaderProps> = ({
                                                   title,
                                                   onSearch,
                                                   searchPlaceholder = 'Пошук...',
                                                   addButtonLabel = 'Додати',
                                                   onAdd,
                                                   showAddButton = true,
                                                   children,
                                               }) => {
    return (
        <div className="d-flex align-items-center justify-content-between mb-3 app-header">
            <div className="d-flex align-items-center gap-3">
                <h2 className="mb-0 app-font" style={{ fontSize: 20 }}>{title}</h2>
                {onSearch && (
                    <input
                        type="text"
                        className="form-control app-font"
                        style={{ fontSize: 14, width: 220 }}
                        placeholder={searchPlaceholder}
                        onChange={e => onSearch(e.target.value)}
                    />
                )}
            </div>
            <div className="d-flex align-items-center gap-2">
                {children}
                {showAddButton && onAdd && (
                    <button
                        className="btn btn-outline-secondary app-font"
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

export default PageHeader;
