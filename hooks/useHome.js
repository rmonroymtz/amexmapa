import { useCallback, useEffect, useState } from 'react';
import usePagination from './usePagination';

const useHome = (props) => {
    const [errorConsultPosition, setErrorConsultPosition] = useState({});
    const [currentPosition, setCurrentPosition] = useState({});
    const [places, setPlaces] = useState(null);

    const talonPagination = usePagination({
        places
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

    const handleSelectPlace = useCallback((place) => {
        console.log('handleSelectPlace works');
    }, []);

    /*Position Methods*/

    const onSuccessConsult = (position) => {
        setCurrentPosition(position);
    };

    const onErrorConsult = (error) => {
        setErrorConsultPosition(error);
    };

    /**
     * Pagination helper
     */

    const handlePrevPage = useCallback(() => {}, []);

    const handleNextPage = useCallback(() => {}, []);

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
        handleSelectPlace,
        places,
        ...talonPagination
    };
};

export default useHome;
