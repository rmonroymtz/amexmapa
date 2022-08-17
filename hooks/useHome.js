import { useCallback, useEffect, useRef, useState } from 'react';
import usePagination from './usePagination';
import { useSideBar } from '../components/Sidebar';

const useHome = (props) => {
    const [errorConsultPosition, setErrorConsultPosition] = useState({});
    const [currentPosition, setCurrentPosition] = useState({});
    const [tempPosicion, setTempositon] = useState({});
    const [places, setPlaces] = useState([]);
    const [clickedItem, setClickedItem] = useState(null);
    const [hoverItem, setHoverItem] = useState(null);
    const mapInstanceRef = useRef();
    const [inputPlace, setInputPlace] = useState('');
    const [mapIsReady, setMapIsReady] = useState(false);

    const [tempLtaLng, setTempLtaLng] = useState({});

    const talonPagination = usePagination({
        listItems: places,
        setClickedItem,
        setHoverItem,
        clickedItem,
        map: mapInstanceRef.current,
        currentPosition,
        tempPosicion
    });

    const { markerPlaces } = talonPagination;

    const talonsUseSideBar = useSideBar({
        markerPlaces,
        clickedItem,
        setClickedItem,
        hoverItem,
        listItems: places,
        ...talonPagination
    });
    /**
     * consul api places
     */
    const handleConsultPlaces = useCallback(async ({ latitude, longitude }) => {
        setTempositon({ latitude, longitude });
        const responsePlace = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCkQJVTqWuO07_wKGoNe6fewhLgSPmv9_g`
        );

        const dataPlace = await responsePlace.json();
        for (const place of dataPlace.results) {
            const testArray = ['locality', 'political'].sort();
            const SelectPlace =
                testArray.length === place.types.length &&
                place.types
                    .sort()
                    .every((value, index) => value === testArray[index]);
            if (SelectPlace) {
                setInputPlace(place.formatted_address);
            }
        }

        const fetchOptions = {
            method: 'post',
            body: JSON.stringify({ latitude, longitude }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const respose = await fetch('/api/newConsult', fetchOptions);
        const data = await respose.json();
        if (data.body) {
            setPlaces(data.body.slice(0, 100));
        }
    }, []);

    /*Position Methods*/

    const onSuccessConsult = (position) => {
        setCurrentPosition(position);
    };

    const onErrorConsult = (error) => {
        setErrorConsultPosition(error);
    };

    /**Helpers center */

    const handleDragEndMap = useCallback(() => {
        const { current: map } = mapInstanceRef;
        const latitude = map.getCenter().lat(),
            longitude = map.getCenter().lng();
        setTempLtaLng({ latitude, longitude });
    }, [mapInstanceRef]);

    useEffect(() => {
        if (!tempLtaLng.latitude || !tempLtaLng.longitude) return;

        handleConsultPlaces(tempLtaLng);
    }, [tempLtaLng, handleConsultPlaces]);

    const handleUpdate = useCallback(() => {
        setUpdateMap((prevState) => !prevState);
    }, []);

    /*
     * Effect to consult current position
     * */

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            onSuccessConsult,
            onErrorConsult
        );
    }, []);

    /*
     * Effect to consult establecimientos
     * */
    useEffect(() => {
        if (currentPosition.coords) {
            handleConsultPlaces(currentPosition.coords);
        }
    }, [currentPosition, handleConsultPlaces]);

    return {
        inputPlace,
        errorConsultPosition,
        currentPosition,
        places,
        mapInstanceRef,
        markerPlaces,
        clickedItem,
        setClickedItem,
        handleDragEndMap,
        handleUpdate,
        mapIsReady,
        setMapIsReady,
        ...talonPagination,
        ...talonsUseSideBar
    };
};

export default useHome;
