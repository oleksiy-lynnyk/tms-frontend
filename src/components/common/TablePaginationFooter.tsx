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

    // Генерує масив сторінок для відображення (з ... для пропусків)
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 7; // Максимум видимих кнопок сторінок

        if (safeTotalPages <= maxVisible) {
            // Якщо сторінок мало, показуємо всі
            for (let i = 0; i < safeTotalPages; i++) {
                pages.push(i);
            }
        } else {
            // Завжди показуємо першу сторінку
            pages.push(0);

            // Обчислюємо діапазон навколо поточної сторінки
            const start = Math.max(1, currentPage - 1);
            const end = Math.min(safeTotalPages - 2, currentPage + 1);

            // Додаємо "..." якщо є пропуск
            if (start > 1) {
                pages.push('...');
            }

            // Додаємо сторінки навколо поточної
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Додаємо "..." якщо є пропуск
            if (end < safeTotalPages - 2) {
                pages.push('...');
            }

            // Завжди показуємо останню сторінку
            pages.push(safeTotalPages - 1);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

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
                    style={{ opacity: currentPage === 0 ? 0.5 : 1, cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
                >
                    &lt;
                </button>
                {pageNumbers.map((page, idx) => {
                    if (page === '...') {
                        return <span key={`ellipsis-${idx}`} style={{ padding: '0 4px', color: '#999' }}>...</span>;
                    }
                    return (
                        <button
                            key={page}
                            className={`page-link${currentPage === page ? ' active' : ''}`}
                            onClick={() => onPageChange(page as number)}
                        >
                            {(page as number) + 1}
                        </button>
                    );
                })}
                <button
                    className="page-link"
                    disabled={currentPage === safeTotalPages - 1}
                    onClick={() => onPageChange(currentPage + 1)}
                    style={{ opacity: currentPage === safeTotalPages - 1 ? 0.5 : 1, cursor: currentPage === safeTotalPages - 1 ? 'not-allowed' : 'pointer' }}
                >
                    &gt;
                </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Rows per page:</span>
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
