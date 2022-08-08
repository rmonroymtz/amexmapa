import { useEffect, useState } from 'react';
const useHome = (props) => {
    const [errorConsultPosition, setErrorConsultPosition] = useState({});
    const [currentPosition, setCurrentPosition] = useState({});

    const handleConsultPlaces = async ({ latitude, longitude }) => {
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify({ latitude, longitude }),
            headers: {
                'Content-Type':'application/json'
            }
        };
        const respose = await fetch('/api/newConsult', fetchOptions);
        const data = await respose.json();
        console.log(data)
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

    return { errorConsultPosition, currentPosition };
};

export default useHome;
