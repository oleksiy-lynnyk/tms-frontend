import React from 'react';

interface Props {
    currentPage: number;
    pageSize: number;
    pageSizeOptions: number[];
    totalElements: number;
    totalPages: number;
    onPageChange: (p: number) => void;
    onPageSizeChange: (size: number) => void;
    startItem: number;
    endItem: number;
}

const TablePaginationFooter: React.FC<Props> = ({
                                                    currentPage,
                                                    pageSize,
                                                    pageSizeOptions,
                                                    totalElements,
                                                    totalPages,
                                                    onPageChange,
                                                    onPageSizeChange,
                                                    startItem,
                                                    endItem,
                                                }) => {
    // Фікс значень для захисту від некоректних даних
    const safeTotalPages = Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1;
    const safePageSizeOptions = Array.isArray(pageSizeOptions) && pageSizeOptions.length > 0
        ? pageSizeOptions
        : [10, 20, 50];

    return (
        <div className="table-pagination-footer">
            <div>
                {`Showing ${totalElements === 0 ? 0 : startItem + 1}-${endItem} out of ${totalElements}`}
            </div>
            <div className="pagination-center">
                <button
                    className="page-link"
                    disabled={currentPage === 0}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    &lt;
                </button>
                {[...Array(safeTotalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`page-link${currentPage === i ? ' active' : ''}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="page-link"
                    disabled={currentPage === safeTotalPages - 1}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    &gt;
                </button>
            </div>
            <div>
                Number of rows
                <select
                    className="rows-per-page"
                    value={pageSize}
                    onChange={e => onPageSizeChange(Number(e.target.value))}
                >
                    {safePageSizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TablePaginationFooter;
