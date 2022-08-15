import { useCallback, useEffect, useState } from 'react';

export const useSideBar = (props) => {
    const {
        markerPlaces,
        clickedItem,
        setClickedItem,
        listItems,
        refInfoWindow,
        refInfoWindowOnClick,
        handleFormatInfo
    } = props;

    const [suggestions, setSuggestions] = useState([]);
    const [clickedPlace, setClickedPlace] = useState(false);
    const [inputSuggestions, setInputSuggestion] = useState('');

    /**
     * UseEffect manage event onClick markers
     */
    useEffect(() => {
        if (typeof clickedItem !== 'number') return;
        const { current: infoWindow } = refInfoWindow;
        const { current: infoWindowClick } = refInfoWindowOnClick;
        const marker = markerPlaces[clickedItem];
        marker.setIcon('/pinBlueHover.png');
        const map = marker.getMap();

        google.maps.event.clearListeners(marker, 'mouseover');
        google.maps.event.clearListeners(marker, 'mouseout');

        marker.setIcon('/pinBlueHover.png');

        infoWindow.close();
        const data = listItems[clickedItem];
        const itemMarker = handleFormatInfo({ marker, data });

        infoWindowClick.setContent(itemMarker);
        infoWindowClick.open(map, marker);
    }, [clickedItem]);

    /**
     *
     * @param {*} number indentifier marker position
     * @returns
     */

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
            google.maps.event.trigger(marker, 'click');
        },
        [markerPlaces]
    );

    /**
     *
     * @param {*} event Event input onChange
     */

    const handleInputSuggestion = (event) => {
        const { value } = event.target;
        if (!clickedPlace.length) {
            setClickedPlace(false);
        }
        setInputSuggestion(value);
    };

    const handleSelectSuggestion = (place) => () => {
        setInputSuggestion(place.nombre_establecimiento);
        setSuggestions([]);
        setClickedPlace(true);
    };

    useEffect(() => {
        if (inputSuggestions.length < 3 || clickedPlace) return;
        const tempPlaces = [];
        for (const item of listItems) {
            if (
                item.nombre_establecimiento.includes(
                    inputSuggestions.toUpperCase()
                )
            ) {
                tempPlaces.push(item);
            }
            if (tempPlaces.length === 5) {
                break;
            }
        }
        setSuggestions(tempPlaces);
    }, [inputSuggestions, listItems, clickedPlace]);

    return {
        handleSideBarOnClick,
        handleSideBarMouseOver,
        handleSideBarMouseOut,
        handleInputSuggestion,
        handleSelectSuggestion,
        setClickedItem,
        inputSuggestions,
        suggestions
    };
};
