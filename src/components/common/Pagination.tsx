// src/components/common/Pagination.tsx
import React from 'react'
import { Pagination } from 'react-bootstrap'

export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const AppPagination: React.FC<PaginationProps> = ({
                                                      currentPage,
                                                      totalPages,
                                                      onPageChange,
                                                  }) => {
    const delta = 1  // скільки сторінок до та після поточної показувати
    const range: (number | string)[] = []

    // допоміжна функція додати сторінку або “…”
    const pushPage = (n: number | string) => {
        const prev = range[range.length - 1]
        if (n === '…' && prev === '…') return  // не дублювати “…”
        range.push(n)
    }

    // генеруємо діапазон
    for (let i = 1; i <= totalPages; i++) {
        if (
            // перші дві
            i <= 2 ||
            // останні дві
            i > totalPages - 2 ||
            // поточна ± delta
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            pushPage(i)
        } else if (
            // місце для “…” між блоками
            i === 3 ||
            i === totalPages - 2 ||
            i === currentPage - delta - 1 ||
            i === currentPage + delta + 1
        ) {
            pushPage('…')
        }
    }

    return (
        <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
            />
            {range.map((item, idx) =>
                typeof item === 'number' ? (
                    <Pagination.Item
                        key={idx}
                        active={item - 1 === currentPage}
                        onClick={() => onPageChange(item - 1)}
                    >
                        {item}
                    </Pagination.Item>
                ) : (
                    <Pagination.Ellipsis key={idx} disabled />
                )
            )}
            <Pagination.Next
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
            />
        </Pagination>
    )
}

export default AppPagination
