import { useCallback, useEffect, useState } from 'react';

export const useSideBar = (props) => {
    const {
        markerPlaces,
        clickedItem,
        setClickedItem,
    } = props;

    useEffect(() => {
        if (typeof clickedItem !== 'number') return;
        const marker = markerPlaces[clickedItem];
        marker.setIcon('/pinBlueHover.png');
    }, [clickedItem, markerPlaces]);

    const [activeItem, setActiveItem] = useState(null);

    const handleSideBarMouseOver = (number) => () => {
        if (number === clickedItem) return;
        const marker = markerPlaces[number];
        google.maps.event.trigger(marker, 'mouseover');
    };

    const handleSideBarMouseOut = (number) => () => {
        if (number === clickedItem) return;
        const marker = markerPlaces[number];
        google.maps.event.trigger(marker, 'mouseout');
    };

    const handleSideBarOnClick = useCallback(
        (number) => () => {
            const marker = markerPlaces[number];
            setClickedItem(number);
            google.maps.event.trigger(marker, 'click');
        },
        [markerPlaces, setClickedItem]
    );

    return {
        handleSideBarOnClick,
        handleSideBarMouseOver,
        handleSideBarMouseOut,
        activeItem,
        setClickedItem
    };
};
