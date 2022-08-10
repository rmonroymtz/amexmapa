import { useCallback, useEffect, useState } from 'react';

const usePagination = ({ pageSize = 10, listItems = [] }) => {

    const [activelistItems, setActivelistItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        if (!listItems) {
            return;
        }
        const startIndex = Math.floor(currentPage - 1) * pageSize;
        const newList = listItems.slice(startIndex, startIndex + 10);
        setTotalPages(Math.ceil(listItems.length / pageSize));
        setActivelistItems(newList);
    }, [listItems]);

    useEffect(() => {
        if (!listItems) return;
        const startIndex = Math.floor(currentPage - 1) * pageSize;
        const newList = listItems.slice(startIndex, startIndex + 10);
        setActivelistItems(newList);
    }, [currentPage]);

    const handleNextPage = useCallback(() => {
        if (currentPage === totalPages) {
            return;
        }
        setCurrentPage((prevState) => prevState + 1);
    }, [currentPage, totalPages]);

    const handlePrevPage = useCallback(() => {
        if (currentPage === 1) {
            return;
        }
        setCurrentPage((prevState) => prevState - 1);
    }, [currentPage]);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    return {
        activelistItems,
        currentPage,
        handleNextPage,
        handlePrevPage,
        handleChangePage,
        setActivelistItems
    };
};

export default usePagination;
