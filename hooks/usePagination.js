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

            const data = listItems [index]

            const distance = `${parseFloat(data.distance_km).toFixed(1)} km`;

            const  itemMarker =(
                ` <div style="display: flex; padding: 1rem;">
                    <div style="margin-right: 1rem">
                            <img  width="20" height="20" src="/restaurant.png"/>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <div style="font-weight: bold; color: #006fcf;">
                            ${marker.title}
                            <span style="color: #000000; margin-left: 1rem; font-weight: normal;">
                                ${distance}
                            </span>
                        </div>
                        <div>
                            ${data.calle_numero}
                        </div>
                    </div>
                </div>`
            )

            if (index >= startIndex && index < lastIndex) {
                marker.setIcon('/pinBlue.png');
                marker.addListener('mouseover', () => {
                    infoWindow.setContent(
                        itemMarker
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
                    infoWindow.setContent(itemMarker);
                    infoWindow.open(marker.getMap(), marker);
                });
            } else {
                marker.setIcon(`/dotBlue.png`);

                marker.addListener('mouseover', () => {
                    infoWindow.setContent(
                        itemMarker
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
