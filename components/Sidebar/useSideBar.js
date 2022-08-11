import { useState } from 'react';

export const useSideBar = (props) => {

    const { markerPlaces } = props;

    const [activeItem, setActiveItem] = useState(null);

    // const infoWindow = new google.maps.InfoWindow();

    const handleSideBarMouseOver = (number) => () => {
        if (!markerPlaces.length) return;
        const marker = markerPlaces[number];
        google.maps.event.trigger(marker, 'mouseover');
        setActiveItem(number);
    };

    const handleSideBarMouseOut = (number) => () => {
        setActiveItem(null);
        const marker = markerPlaces[number];
        google.maps.event.trigger(marker, 'mouseout');
    };

    return { handleSideBarMouseOver, handleSideBarMouseOut, activeItem };
};
