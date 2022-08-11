import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const usePagination = ({
    pageSize = 10,
    listItems = [],
    markerPlaces = []
}) => {
    const [activelistItems, setActivelistItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const refInfoWindow = useRef();

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

    useEffect(() => {
        if (!markerPlaces.length) {
            return;
        }

        if (!refInfoWindow.current) {
            refInfoWindow.current = new google.maps.InfoWindow();
        }
        const startIndex = Math.floor(currentPage - 1) * pageSize;
        const lastIndex = startIndex + 10;
        const { current: infoWindow } = refInfoWindow;
        markerPlaces.forEach((marker, index) => {
            if (index >= startIndex && index < lastIndex) {
                marker.setIcon('/pinBlue.png');

                marker.addListener('mouseover', () => {
                    infoWindow.setContent(
                        `<p styles="{font-weight: bold;}"> ${marker.getTitle()}</p>`
                    );
                    infoWindow.open(marker.getMap(), marker);
                    marker.setIcon('/pinBlueHover.png');
                });

                marker.addListener('mouseout', () => {
                    marker.setIcon(`/pinBlue.png`);
                    infoWindow.close();
                });

                marker.addListener('click', () => {
                    infoWindow.close();
                    infoWindow.setContent(marker.getTitle());
                    infoWindow.open(marker.getMap(), marker);
                });
            } else {
                marker.setIcon(`/dotBlue.png`);

                marker.addListener('mouseover', () => {
                    infoWindow.setContent(
                        `<p styles="{font-weight: bold;}"> ${marker.getTitle()}</p>`
                    );
                    infoWindow.open(marker.getMap(), marker);
                    marker.setIcon('/dotBlueHover.png');
                });

                marker.addListener('mouseout', () => {
                    marker.setIcon(`/dotBlue.png`);
                    infoWindow.close();
                });

                marker.addListener('click', () => {
                    console.log('Estoy funcnando');
                    infoWindow.close();
                    infoWindow.setContent(marker.getTitle());
                    infoWindow.open(marker.getMap(), marker);
                });
            }
        });
    }, [markerPlaces, currentPage, pageSize]);

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
        setActivelistItems,
        pageSize
    };
};

export default usePagination;
