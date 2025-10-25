// src/components/common/PageHeader.tsx
import React from 'react';

interface PageHeaderProps {
    /** Основний заголовок сторінки */
    title: string;
    /** Обробник натискання кнопки "Add" */
    onAdd: () => void;
    /** Текст кнопки за замовчуванням "Add" */
    addLabel?: string;
    /** Текст для поля пошуку (обов'язковий) */
    searchValue: string;
    /** Обробник зміни поля пошуку (обов'язковий) */
    onSearchChange: (value: string) => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
                                                   title,
                                                   onAdd,
                                                   addLabel = 'Add',
                                                   searchValue,
                                                   onSearchChange,
                                               }) => (
    <div className="page-header d-flex align-items-center justify-content-between mb-3" style={{ padding: '16px 0' }}>
        <div className="d-flex align-items-center gap-3">
            <h2 className="page-title m-0">{title}</h2>
            <input
                type="text"
                className="form-control"
                style={{ width: 200, height: 34 }}
                value={searchValue}
                placeholder="Search..."
                onChange={e => onSearchChange(e.target.value)}
            />
        </div>
        <button className="btn btn-outline-primary" style={{ height: 34 }} onClick={onAdd}>
            {addLabel}
        </button>
    </div>
);

export default PageHeader;
