import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const usePagination = ({
    pageSize = 10,
    listItems = [],
    setClickedItem,
    setHoverItem,
    map,
    currentPosition,
    tempPosicion
}) => {
    const [activelistItems, setActivelistItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const refInfoWindow = useRef();
    const refInfoWindowOnClick = useRef();

    const [currentMarker, setCurrentMarker] = useState(null);

    const markersRef = useRef();

    /**
     * Handle events google maps markers
     */

    const handleFormatInfo = ({ data }) => {
        const distance = `${parseFloat(data.distance_km).toFixed(1)} km`;

        const itemMarker = `<div style="display: flex; padding: 1rem;">
        <div style="margin-right: 1rem">
                <img  width="20" height="20" src="/restaurantBlue.png"/>
        </div>
        <div style="display: flex; flex-direction: column;">
            <div style="font-weight: bold; color: #006fcf;">
                ${data.nombre_establecimiento}
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
                const { current: markerPlaces } = markersRef;
                for (const [id, mark] of markerPlaces.entries()) {
                    if (
                        mark.get('icon') === '/pinBlueHover.png' &&
                        id !== index
                    ) {
                        const data = listItems[id];
                        const itemMarker = handleFormatInfo({
                            data
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
        [markersRef, setClickedItem, setHoverItem, listItems]
    );

    /**
     * Useffect update markers
     */
    const markerPlaces = useMemo(() => {
        if (!listItems.length) {
            return;
        }

        if (markersRef.current && markersRef.current.length) {
            markersRef.current.map((marker) => {
                marker.setMap(null);
                marker = null;
            });
        }

        if (!refInfoWindow.current) {
            refInfoWindow.current = new google.maps.InfoWindow();
            refInfoWindow.current.setZIndex(99);
        }

        if (!refInfoWindowOnClick.current) {
            refInfoWindowOnClick.current = new google.maps.InfoWindow();
        }

        if (!currentMarker) {
            const current = new google.maps.Marker({
                position: {
                    lat: parseFloat(currentPosition.coords.latitude),
                    lng: parseFloat(currentPosition.coords.longitude)
                },
                map,
                icon: '/pinRed.png'
            });

            setCurrentMarker(current);
        } else {
            currentMarker.setPosition({
                lat: parseFloat(tempPosicion.latitude),
                lng: parseFloat(tempPosicion.longitude)
            });
        }

        const startIndex = Math.floor(currentPage - 1) * pageSize;
        const lastIndex = startIndex + 10;
        const { current: infoWindow } = refInfoWindow;

        const markerPlaces = listItems.map((data, index) => {
            const marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(data.latitude),
                    lng: parseFloat(data.longitude)
                },
                map
            });
            const itemMarker = handleFormatInfo({ data });

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
                    if (markersRef.current[index].isClickActive) return;

                    setHoverItem(null);
                    marker.setIcon(`/dotBlue.png`);
                    infoWindow.close();
                });

                marker.addListener(
                    'click',
                    handleOnClick({ startIndex, index })
                );
            }
            return marker;
        });

        markersRef.current = markerPlaces;
        return markerPlaces;
    }, [
        handleOnClick,
        currentPage,
        pageSize,
        setHoverItem,
        listItems,
        map,
        currentPosition,
        tempPosicion,
        currentMarker,
        setCurrentMarker
    ]);

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
        handleFormatInfo,
        totalPages,
        markerPlaces
    };
};

export default usePagination;
