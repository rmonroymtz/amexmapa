import { useCallback, useEffect, useState } from 'react';
import { useDropdown } from '../../hooks/useDropdown';

export const useSideBar = (props) => {
    const {
        markerPlaces,
        clickedItem,
        setClickedItem,
        listItems,
        refInfoWindow,
        refInfoWindowOnClick,
        handleFormatInfo,
        setTempLtaLng,
        mapInstanceRef,
        tempLtaLng,
        setPlaces
    } = props;

    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(false);
    const [inputSuggestions, setInputSuggestion] = useState('');
    const { triggerRef, elementRef, expanded, setExpanded } = useDropdown();

    /**
     * useEffect Reset when listItems change
     */

    useEffect(() => {
        setSuggestions([]);
        setSelectedSuggestion(false);
        setInputSuggestion('');
        setExpanded(false);
        setClickedItem(null);
    }, [listItems]);

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
        if (!value.length) {
            setExpanded(false);
            setSelectedSuggestion(false);
        } else {
            setExpanded(true);
        }
        setInputSuggestion(value);
    };

    const handleSelectSuggestion = (place) => () => {
        setInputSuggestion(place.nombre_establecimiento);
        setSelectedSuggestion(true);
        setSuggestions([]);
        setExpanded(false);
        handleConsultSuggestion(place);
    };

    const handleConsultSuggestion = useCallback(
        async (place) => {
            try {
                const { latitude, longitude } = tempLtaLng;

                const fetchOptions = {
                    method: 'post',
                    body: JSON.stringify({
                        latitude,
                        longitude,
                        NameSearch: place.nombre_establecimiento
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const respose = await fetch('/api/newConsult', fetchOptions);
                const data = await respose.json();
                if (data.body) {
                    setPlaces(data.body);
                    setInputSuggestion(place.nombre_establecimiento);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [inputSuggestions, tempLtaLng, setPlaces]
    );

    useEffect(() => {
        const tempPlaces = [];

        if (inputSuggestions.length >= 3) {
            if (selectedSuggestion) return;

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
        }
        setSuggestions(tempPlaces);
    }, [inputSuggestions, listItems, selectedSuggestion]);

    useEffect(() => {
        if (!expanded && !selectedSuggestion) {
            setInputSuggestion('');
        }
    }, [expanded, selectedSuggestion]);

    /**
     * Handle Change Place
     */

    const handlePlaceChange = useCallback(
        (autocomplete) => {
            const { current: map } = mapInstanceRef;
            const { geometry } = autocomplete.getPlace();
            const latitude = geometry.location.lat();
            const longitude = geometry.location.lng();
            map.panTo({ lng: longitude, lat: latitude });
            setTempLtaLng({ latitude, longitude });
        },
        [setTempLtaLng, mapInstanceRef]
    );

    return {
        handleSideBarOnClick,
        handleSideBarMouseOver,
        handleSideBarMouseOut,
        handleInputSuggestion,
        handleSelectSuggestion,
        handlePlaceChange,
        setClickedItem,
        inputSuggestions,
        suggestions,
        setClickedItem,
        inputSuggestions,
        triggerRef,
        elementRef
    };
};
