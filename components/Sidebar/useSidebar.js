import { useCallback, useEffect, useState } from 'react';

const useSidebar = (props) => {
    const itemsPerPage = 10;
    const { places } = props;

    const [pages, setPages] = useState(0);
    const [filterPlaces, setFilterPlaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = useCallback(() => {}, []);

    useEffect(() => {
        if (!places) return null;
        console.log(places);
        const count = places.length / itemsPerPage;

        setPages(count);
    }, [places]);

    return {};
};

export default useSidebar;
