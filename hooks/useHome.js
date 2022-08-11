import { useCallback, useEffect, useRef, useState } from 'react';
import usePagination from './usePagination';
import { useSideBar } from '../components/Sidebar';

const useHome = (props) => {
    const [errorConsultPosition, setErrorConsultPosition] = useState({});
    const [currentPosition, setCurrentPosition] = useState({});
    const [places, setPlaces] = useState(null);
    const [markerPlaces, setMarkerPlaces] = useState([]);
    const mapInstanceRef = useRef();

    const talonPagination = usePagination({
        markerPlaces,
        listItems: places
    });

    const talonsUseSideBar = useSideBar({
        markerPlaces,
        ...talonPagination
    });
    /**
     * consul api places
     */
    const handleConsultPlaces = async ({ latitude, longitude }) => {
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
    };

    /*Position Methods*/

    const onSuccessConsult = (position) => {
        setCurrentPosition(position);
    };

    const onErrorConsult = (error) => {
        setErrorConsultPosition(error);
    };

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
    }, [currentPosition]);

    return {
        errorConsultPosition,
        currentPosition,
        places,
        mapInstanceRef,
        setMarkerPlaces,
        markerPlaces,
        ...talonPagination,
        ...talonsUseSideBar
    };
};

export default useHome;
