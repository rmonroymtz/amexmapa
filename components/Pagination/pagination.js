import { useMemo } from 'react';
import {IconChevronLeft} from "../Icons/icons";

const Pagination = ({
    styles,
    totalPages = 10,
    currentPage = 1,
    handleNextPage = () => {},
    handlePrevPage = () => {},
    handleChangePage = () => {}
}) => {
    const buttons = Array.from(Array(totalPages).keys()).map((index) => {

        const active = index===currentPage -1

        const changeBtn = active? styles.number:styles.numberHidden

        return (
            <button
                className={changeBtn}
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
            <button
                className={styles.btnPrev}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                <IconChevronLeft className={styles.iconLeft}/>
                <span className={styles.labelPagination}>Previous</span>
            </button>
            {buttons}
            <button
                className={styles.btnPrev}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                <span className={styles.labelPagination}>Next</span>
                <IconChevronLeft className={styles.iconRight}/>
            </button>
        </div>
    );
};

export default Pagination;
