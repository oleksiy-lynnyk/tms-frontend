import React from 'react';

const columnDefs = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'Priority' },
    { key: 'owner', label: 'Owner' },
    { key: 'tags', label: 'Tags' },
    { key: 'state', label: 'State' },
    { key: 'type', label: 'Type of Test Case' },
    { key: 'automationStatus', label: 'Automation Status' },
    { key: 'component', label: 'Component' },
    { key: 'requirement', label: 'Requirement' },
];

export default function TestCaseTable({
                                          testCases,
                                          visibleColumns,
                                          sortColumn,
                                          sortDirection,
                                          onSort,
                                          onEdit,
                                          onDelete,
                                          page,
                                          totalPages,
                                          onPageChange,
                                      }) {
    const renderSortArrow = col =>
        sortColumn === col ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : '';

    const renderPagination = () => (
        <div className="d-flex justify-content-end mt-2">
            <button
                className="btn btn-outline-secondary btn-sm me-2"
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
            >
                Previous
            </button>
            <span>
        Page {page + 1} of {totalPages}
      </span>
            <button
                className="btn btn-outline-secondary btn-sm ms-2"
                disabled={page + 1 >= totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </button>
        </div>
    );

    return (
        <>
            <table className="table table-bordered table-sm mb-0">
                <thead>
                <tr>
                    {columnDefs.map(({ key, label }) =>
                        visibleColumns[key] ? (
                            <th
                                key={key}
                                onClick={() => onSort(key)}
                                style={{ cursor: 'pointer' }}
                            >
                                {label}{renderSortArrow(key)}
                            </th>
                        ) : null
                    )}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {testCases.map(tc => (
                    <tr key={tc.id}>
                        {columnDefs.map(({ key }) =>
                            visibleColumns[key] ? (
                                <td key={key}>
                                    {key === 'id' ? `TC-${tc.id}` : (tc[key] || '-')}
                                </td>
                            ) : null
                        )}
                        <td>
                            <button
                                className="btn btn-outline-primary btn-sm me-2"
                                onClick={() => onEdit(tc)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => onDelete(tc)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {renderPagination()}
        </>
    );
}
