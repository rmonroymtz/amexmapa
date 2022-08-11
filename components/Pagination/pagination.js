import { useMemo } from 'react';

const Pagination = ({
    styles,
    totalPages = 10,
    currentPage = 1,
    handleNextPage = () => {},
    handlePrevPage = () => {},
    handleChangePage = () => {}
}) => {
    const buttons = Array.from(Array(totalPages).keys()).map((index) => {
        return (
            <button
                key={`button-${index}`}
                disabled={index === currentPage - 1}
                onClick={() => handleChangePage(index + 1)}
            >
                {index + 1}
            </button>
        );
    });

    return (
        <div className={styles.containerPagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
            </button>
            {buttons}
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
