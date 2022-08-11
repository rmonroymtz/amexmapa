import { useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
const Map = (props) => {
    const { places, mapInstanceRef, coords, setMarkerPlaces, markerPlaces } =
        props;
    const mapRef = useRef();

    const [mapIsReady, setMapIsReady] = useState(false);

    const handleCreateGoogleMap = (coords) => {
        if (!coords) return null;

        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
            center: { lat: coords.latitude, lng: coords.longitude },
            zoom: 11,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false
        });

        setMapIsReady(true);
    };

    useEffect(() => {
        handleCreateGoogleMap(coords);
    }, [coords]);

    useEffect(() => {
        if (!mapIsReady) return;

        if (markerPlaces.length) {
            console.log('Tenemos que limpiar los');
        }

        new google.maps.Marker({
            position: { lat: coords.latitude, lng: coords.longitude },
            map: mapInstanceRef.current,
            icon: '/pinRed.png'
        });

        const markers = places.map((place) => {
            const marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(place.latitude),
                    lng: parseFloat(place.longitude)
                },
                map: mapInstanceRef.current,
                title: place.nombre_establecimiento,
            });

            return marker;
        });

        setMarkerPlaces(markers);
        setMapIsReady(false);
    }, [
        mapIsReady,
        setMarkerPlaces,
        coords,
        markerPlaces,
        mapInstanceRef,
        places
    ]);

    return <div id="mapContainer" className={styles.map} ref={mapRef}></div>;
};

export default Map;
