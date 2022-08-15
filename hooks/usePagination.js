import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const usePagination = ({
    pageSize = 10,
    listItems = [],
    markerPlaces = [],
    setClickedItem,
    setHoverItem,
    clickedItem
}) => {
    const [activelistItems, setActivelistItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const refInfoWindow = useRef();
    const refInfoWindowOnClick = useRef();

    /**
     * Handle events google maps markers
     */

    const handleFormatInfo = ({ data, marker }) => {
        const distance = `${parseFloat(data.distance_km).toFixed(1)} km`;

        const itemMarker = `<div style="display: flex; padding: 1rem;">
        <div style="margin-right: 1rem">
                <img  width="20" height="20" src="/restaurantBlue.png"/>
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
    </div>`;

        return itemMarker;
    };

    const handleOnClick = useCallback(
        ({ startIndex, index }) =>
            () => {
                const { current: infoWindow } = refInfoWindow;
                const { current: infoWindowClick } = refInfoWindowOnClick;
                const marker = markerPlaces[index];
                for (const [id, mark] of markerPlaces.entries()) {
                    if (
                        mark.get('icon') === '/pinBlueHover.png' &&
                        id !== index
                    ) {
                        const data = listItems[id];
                        const itemMarker = handleFormatInfo({
                            data,
                            marker: mark
                        });
                        let icon;
                        let hoverIcon;
                        if (id >= startIndex && id < startIndex + 10) {
                            icon = '/pinBlue.png';
                            hoverIcon = '/pinBlueHover.png';
                            mark.setIcon(icon);
                        } else {
                            icon = `/dotBlue.png`;
                            hoverIcon = '/dotBlueHover.png';
                            mark.setIcon(icon);
                        }

                        mark.addListener('mouseover', () => {
                            setHoverItem(startIndex + index);
                            infoWindow.setContent(itemMarker);
                            infoWindow.open(mark.getMap(), mark);
                            mark.setIcon(hoverIcon);
                        });

                        mark.addListener('mouseout', () => {
                            setHoverItem(null);
                            mark.setIcon(icon);
                            infoWindow.close();
                        });
                    }
                }
                setClickedItem(index);



            },
        [markerPlaces, setClickedItem, setHoverItem, listItems]
    );

    /**
     * Use effect generate pagination
     */
    useEffect(() => {
        if (!listItems) {
            return;
        }
        const startIndex = Math.floor(currentPage - 1) * pageSize;
        const newList = listItems.slice(startIndex, startIndex + 10);
        setTotalPages(Math.ceil(listItems.length / pageSize));
        setActivelistItems(newList);
    }, [listItems]);

    /**
     * Usffect when change page
     */
    useEffect(() => {
        if (!listItems) return;
        const startIndex = Math.floor(currentPage - 1) * pageSize;
        const newList = listItems.slice(startIndex, startIndex + 10);
        setActivelistItems(newList);
    }, [currentPage]);

    /**
     * Useffect generate markers;
     */
    useEffect(() => {
        if (!markerPlaces.length) {
            return;
        }

        if (!refInfoWindow.current) {
            refInfoWindow.current = new google.maps.InfoWindow();
            refInfoWindow.current.setZIndex(99);
        }

        if (!refInfoWindowOnClick.current) {
            refInfoWindowOnClick.current = new google.maps.InfoWindow();
        }

        const startIndex = Math.floor(currentPage - 1) * pageSize;
        const lastIndex = startIndex + 10;
        const { current: infoWindow } = refInfoWindow;

        markerPlaces.forEach((marker, index) => {
            const data = listItems[index];

            const itemMarker = handleFormatInfo({ marker, data });

            if (index >= startIndex && index < lastIndex) {
                marker.setIcon('/pinBlue.png');
                marker.addListener('mouseover', () => {
                    setHoverItem(startIndex + index);
                    infoWindow.setContent(itemMarker);
                    infoWindow.open(marker.getMap(), marker);
                    marker.setIcon('/pinBlueHover.png');
                });

                marker.addListener('mouseout', () => {
                    setHoverItem(null);
                    marker.setIcon(`/pinBlue.png`);
                    infoWindow.close();
                });

                marker.addListener(
                    'click',
                    handleOnClick({ startIndex, index })
                );
            } else {
                marker.setIcon(`/dotBlue.png`);

                marker.addListener('mouseover', () => {
                    infoWindow.setContent(itemMarker);
                    setHoverItem(startIndex + index);
                    infoWindow.open(marker.getMap(), marker);
                    marker.setIcon('/dotBlueHover.png');
                });

                marker.addListener('mouseout', () => {
                    if (markerPlaces[index].isClickActive) return;
                    setHoverItem(null);
                    marker.setIcon(`/dotBlue.png`);
                    infoWindow.close();
                });

                marker.addListener(
                    'click',
                    handleOnClick({ startIndex, index })
                );
            }
        });
    }, [
        markerPlaces,
        currentPage,
        pageSize,
        setHoverItem,
        clickedItem,
        handleOnClick,
        listItems
    ]);

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
        pageSize,
        refInfoWindow,
        refInfoWindowOnClick,
        handleFormatInfo
    };
};

export default usePagination;
