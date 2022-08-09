import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
const Map = (props) => {
    const { places } = props;
    console.log({ places });
    const [map, setMap] = useState(null);
    const { markers, coords } = props;
    const mapRef = useRef();
    const testRef = useRef();

    const [mapIsReady, setMapIsReady] = useState(false);

    const handleCreateGoogleMap = (coords) => {
        if (!coords) return null;

        const map = new google.maps.Map(mapRef.current, {
            center: { lat: coords.latitude, lng: coords.longitude },
            zoom: 10,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false
        });

        testRef.current = map;

        new google.maps.Marker({
            position: { lat: coords.latitude, lng: coords.longitude },
            map,
            title: 'a huevo'
        });

        setMapIsReady(true);
    };

    const handleCenter = (event) => {
        console.log('getCenter');
        console.log(testRef.current.getCenter());
    };

    useEffect(() => {
        handleCreateGoogleMap(coords);
    }, [coords]);

    useEffect(() => {
        if (!mapIsReady) return;
        const infoWindow = new google.maps.InfoWindow();

        places.forEach((place) => {
            const marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(place.latitude),
                    lng: parseFloat(place.longitude)
                },
                map: testRef.current,
                title: place.nombre_establecimiento,
                icon: `https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png`
            });

            marker.addListener('click', () => {
                infoWindow.close();
                infoWindow.setContent(marker.getTitle());
                infoWindow.open(marker.getMap(), marker);
            });
        });
        // google.maps.event.addDomListener(mapRef.current, 'mouseover', () => {
        //     window.alert('Map was clicked!');
        // });

        setMapIsReady(false);
    }, [mapIsReady, places]);

    return (
        <Fragment>
            <button onClick={handleCenter}>Probando</button>
            <div id="mapContainer" className={styles.map} ref={mapRef}></div>
        </Fragment>
    );
};

export default Map;
