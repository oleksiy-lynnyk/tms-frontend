// src/components/common/Pagination.tsx

import React from 'react';
import { Pagination } from 'react-bootstrap';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const AppPagination: React.FC<PaginationProps> = ({
                                                      currentPage,
                                                      totalPages,
                                                      onPageChange
                                                  }) => {
    // Збираємо масив номерів сторінок (можна покращити «розумним» сгрупуванням)
    const pages = Array.from({ length: totalPages }, (_, i) => i);

    return (
        <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
            />
            {pages.map(num => (
                <Pagination.Item
                    key={num}
                    active={num === currentPage}
                    onClick={() => onPageChange(num)}
                >
                    {num + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
            />
        </Pagination>
    );
};

export default AppPagination;
