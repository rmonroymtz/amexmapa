import { useCallback, useEffect, useState } from 'react';

export const useSideBar = (props) => {
    const { markerPlaces, clickedItem, setClickedItem, listItems } = props;

    const [suggestions, setSuggestions] = useState([]);
    const [inputSuggestions, setInputSuggestion] = useState('');

    useEffect(() => {
        if (typeof clickedItem !== 'number') return;
        const marker = markerPlaces[clickedItem];
        marker.setIcon('/pinBlueHover.png');
    }, [clickedItem, markerPlaces]);

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

    return {
        handleSideBarOnClick,
        handleSideBarMouseOver,
        handleSideBarMouseOut,
        handleInputSuggestion,
        setClickedItem,
        inputSuggestions
    };
};
