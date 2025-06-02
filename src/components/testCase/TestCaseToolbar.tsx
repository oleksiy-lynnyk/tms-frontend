import React from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import type { ColumnKey } from '../../types'; // або просто type ColumnKey = string;

interface Props {
    search: string;
    onSearch: (v: string) => void;
    onAdd: () => void;
    onImportCsv: () => void;
    anySelected: boolean;
    onBulkEdit: () => void;
    onBulkCopy: () => void;
    onBulkMove: () => void;
    onBulkDelete: () => void;
    onShowManageColumns: () => void; // ← нова пропса!
}

const TestCaseToolbar: React.FC<Props> = ({
                                              search, onSearch, onAdd, onImportCsv,
                                              anySelected, onBulkEdit, onBulkCopy, onBulkMove, onBulkDelete,
                                              onShowManageColumns
                                          }) => (
    <div className="testcase-toolbar">
        <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
            {anySelected && (
                <>
                    <Button size="sm" variant="outline-primary" onClick={onBulkEdit}>Edit</Button>
                    <Button size="sm" variant="outline-primary" onClick={onBulkCopy}>Copy</Button>
                    <Button size="sm" variant="outline-primary" onClick={onBulkMove}>Move</Button>
                    <Button size="sm" variant="outline-danger" onClick={onBulkDelete}>Delete</Button>
                </>
            )}
            <InputGroup size="sm" style={{ width: 220 }}>
                <Form.Control
                    placeholder="Search test cases..."
                    value={search}
                    onChange={e => onSearch(e.target.value)}
                />
                {search && (
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onSearch('')}
                    >×</Button>
                )}
            </InputGroup>
        </div>
        <div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
            <Button size="sm" variant="outline-primary" onClick={onAdd}>Add Test Case</Button>
            <Button size="sm" variant="outline-primary" onClick={onImportCsv}>Import CSV</Button>
            <Button size="sm" variant="outline-primary" onClick={onShowManageColumns}>Manage Columns</Button>
        </div>
    </div>
);

export default TestCaseToolbar;
