import { useCallback, useEffect, useState } from 'react';

const PAGE_SIZE = 10;

const usePagination = (props) => {
    const { places } = props;

    const [activePlaces, setActivePlaces] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        if (!places) {
            return;
        }
        setTotalPages(Math.ceil(places.length / PAGE_SIZE));
        setActivePlaces(places.slice(0, 10));
    }, [places]);

    const handleNextPage = useCallback(() => {
        if (currentPage === totalPages) {
            return;
        }
    }, [currentPage, totalPages]);

    const handlePrevPage = useCallback(() => {
        if (currentPage === 1) {
            return;
        }
    }, [currentPage]);

    return { activePlaces, currentPage, handleNextPage, handlePrevPage };
};

export default usePagination;
