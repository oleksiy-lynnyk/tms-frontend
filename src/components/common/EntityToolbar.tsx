import React from 'react';

interface EntityToolbarProps {
    title: string;
    addLabel?: string;
    onAdd: () => void;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

const EntityToolbar: React.FC<EntityToolbarProps> = ({
                                                         title,
                                                         addLabel = 'Add',
                                                         onAdd,
                                                         searchValue = '',
                                                         onSearchChange,
                                                     }) => (
    <div className="entity-toolbar d-flex align-items-center justify-content-between mb-2" style={{ padding: '8px 0', minHeight: 48 }}>
        <div style={{ fontWeight: 600, fontSize: 22, marginLeft: 6 }}>{title}</div>
        <div className="d-flex align-items-center gap-2">
            {onSearchChange && (
                <input
                    type="text"
                    className="form-control"
                    style={{ width: 230, height: 34, borderRadius: 8, fontSize: 14 }}
                    value={searchValue}
                    placeholder="Search..."
                    onChange={e => onSearchChange(e.target.value)}
                />
            )}
            <button className="btn btn-outline-primary" style={{ height: 34, minWidth: 70 }} onClick={onAdd}>
                {addLabel}
            </button>
        </div>
    </div>
);

export default EntityToolbar;




