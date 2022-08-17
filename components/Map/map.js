import { useCallback, useEffect, useRef } from 'react';
import styles from './map.module.css';
const Map = (props) => {
    const { mapInstanceRef, coords, setMapIsReady, mapIsReady, dragEnd } =
        props;

    const mapRef = useRef();

    const handleCreateGoogleMap = useCallback(
        (coords) => {
            if (!coords) return null;

            mapInstanceRef.current = new google.maps.Map(mapRef.current, {
                center: { lat: coords.latitude, lng: coords.longitude },
                zoom: 11,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false
            });

            mapInstanceRef.current.addListener('dragend', dragEnd);

            mapInstanceRef.current.addListener('tilesloaded', () => {
                setMapIsReady(true);
            });
        },
        [mapInstanceRef, dragEnd, setMapIsReady]
    );

    useEffect(() => {
        if (!mapIsReady) {
            handleCreateGoogleMap(coords);
        }
    }, [coords, handleCreateGoogleMap, mapIsReady]);

    return <div id="mapContainer" className={styles.map} ref={mapRef}></div>;
};

export default Map;
