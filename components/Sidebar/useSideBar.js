import { useCallback, useEffect, useState } from 'react';

export const useSideBar = (props) => {
<<<<<<< HEAD
    const {
        markerPlaces,
        clickedItem,
        setClickedItem,
        listItems,
        refInfoWindow,
        refInfoWindowOnClick,
        handleFormatInfo
    } = props;
=======
    const { markerPlaces, clickedItem, setClickedItem, listItems } = props;

    const [suggestions, setSuggestions] = useState([]);
    const [inputSuggestions, setInputSuggestion] = useState('');
>>>>>>> d01e700825bb89adcf0448a2f0548488799252d9

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

<<<<<<< HEAD
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

=======
>>>>>>> d01e700825bb89adcf0448a2f0548488799252d9
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

<<<<<<< HEAD
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
=======
    const handleInputSuggestion = (event) => {
        const { value } = event.target;
        console.log(value);
        setInputSuggestion(value);
    };

    useEffect(() => {
        if (inputSuggestions.length < 3) return;
        let count = 0;
        for(const item of listItems){
            if(item.nombre_establecimiento.toLowerCase().includes(inputSuggestions)){
                console.log(item.nombre_establecimiento)
            }
        }
    }, [inputSuggestions, listItems]);
>>>>>>> d01e700825bb89adcf0448a2f0548488799252d9

    return {
        handleSideBarOnClick,
        handleSideBarMouseOver,
        handleSideBarMouseOut,
        handleInputSuggestion,
<<<<<<< HEAD
        handleSelectSuggestion,
        setClickedItem,
        inputSuggestions,
        suggestions
=======
        setClickedItem,
        inputSuggestions
>>>>>>> d01e700825bb89adcf0448a2f0548488799252d9
    };
};
