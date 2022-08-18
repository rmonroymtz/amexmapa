import { useCallback, useEffect, useRef, useState } from 'react';
import usePagination from './usePagination';
import { useSideBar } from '../components/Sidebar';

const CATEGORIES = {
    restaurant: ['Restaurant'],
    retail: ['Retail'],
    travel: ['Travel', 'Transportation', 'Auto Rental', 'Lodging'],
    entertainment: ['Entertainment'],
    services: [
        'Professional Services',
        'Education',
        'Transportation',
        'Auto Rental',
        'Healthcare Services'
    ]
};

const useHome = (props) => {
    const [errorConsultPosition, setErrorConsultPosition] = useState({});
    const [currentPosition, setCurrentPosition] = useState({});
    const [places, setPlaces] = useState([]);
    const [clickedItem, setClickedItem] = useState(null);
    const [hoverItem, setHoverItem] = useState(null);
    const mapInstanceRef = useRef();
    const [inputPlace, setInputPlace] = useState('');
    const [mapIsReady, setMapIsReady] = useState(false);

    const [tempLtaLng, setTempLtaLng] = useState({});

    const [categories, setCategories] = useState('');

    /**
     * consul api places
     */
    const handleConsultPlaces = useCallback(
        async ({ latitude, longitude, categorie }) => {
            const responsePlace = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCkQJVTqWuO07_wKGoNe6fewhLgSPmv9_g`
            );

            const dataPlace = await responsePlace.json();
            let name = '';
            for (const place of dataPlace.results[0].address_components) {
                const SelectPlace =
                    place.types.filter((i) => i === 'plus_code').length === 0;

                if (SelectPlace) {
                    name = `${name} ${place.long_name}`;
                }
            }

            setInputPlace(name);

            const fetchOptions = {
                method: 'post',
                body: JSON.stringify({
                    latitude,
                    longitude,
                    industria: CATEGORIES[categorie]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const respose = await fetch('/api/newConsult', fetchOptions);
            const data = await respose.json();
            if (data.body) {
                setPlaces(data.body);
            }
        },
        []
    );

    const talonPagination = usePagination({
        listItems: places,
        setClickedItem,
        setHoverItem,
        clickedItem,
        map: mapInstanceRef.current,
        currentPosition,
        tempPosicion: tempLtaLng
    });

    const { markerPlaces } = talonPagination;

    const talonsUseSideBar = useSideBar({
        currentPosition,
        handleConsultPlaces,
        markerPlaces,
        clickedItem,
        setClickedItem,
        hoverItem,
        listItems: places,
        setTempLtaLng,
        setPlaces,
        tempLtaLng,
        mapInstanceRef,
        ...talonPagination
    });

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
            setTempLtaLng(currentPosition.coords);
        }
    }, [currentPosition, handleConsultPlaces]);

    const handleApplyFilters = (action) => {
        const { latitude, longitude } = tempLtaLng;
        handleConsultPlaces({ categorie: categories, latitude, longitude });
        action(false);
    };

    const handleClearFilters = (action) => {
        handleConsultPlaces(tempLtaLng);
        setCategories('');
        action(false);
    };

    return {
        handleApplyFilters,
        handleClearFilters,
        categories,
        setCategories,
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
        setInputPlace,
        ...talonPagination,
        ...talonsUseSideBar
    };
};

export default useHome;
