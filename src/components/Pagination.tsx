import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const showMax = 5;

        if (totalPages <= showMax) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(totalPages, currentPage + 1);

            if (currentPage <= 2) {
                end = 4;
            } else if (currentPage >= totalPages - 1) {
                start = totalPages - 3;
            }

            if (start > 1) pages.push(1);
            if (start > 2) pages.push('...');

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) pages.push('...');
            if (end < totalPages) pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center space-x-3 mt-16 pb-8">
            <nav className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-brand-600 hover:bg-white transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={`dots-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold text-xs pb-1">...</span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-xs transition-all ${currentPage === page
                                        ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 transform scale-110'
                                        : 'text-gray-500 hover:text-brand-600 hover:bg-white'
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-brand-600 hover:bg-white transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
