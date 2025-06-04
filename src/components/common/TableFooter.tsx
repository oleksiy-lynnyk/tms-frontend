import React from 'react'

interface Props {
    startItem: number
    endItem: number
    total: number
    currentPage: number
    totalPages: number
    onPageChange: (p: number) => void
}

const TableFooter: React.FC<Props> = ({
                                          startItem,
                                          endItem,
                                          total,
                                          currentPage,
                                          totalPages,
                                          onPageChange
                                      }) => {
    if (total === 0) return null

    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center p-2 border-top bg-white table-footer">
            <div className="text-muted small ms-1">
                {`Showing ${startItem} to ${endItem} of ${total} results`}
            </div>
            <div>
                <nav>
                    <ul className="pagination pagination-sm mb-0">
                        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => onPageChange(currentPage - 1)} tabIndex={-1}>&laquo;</button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
                                <button className="page-link" onClick={() => onPageChange(i)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => onPageChange(currentPage + 1)} tabIndex={-1}>&raquo;</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default TableFooter
