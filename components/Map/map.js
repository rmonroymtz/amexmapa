import { useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
const Map = (props) => {

    const [map, setMap] = useState(null);
    const { markers, coords } = props;
    const mapRef = useRef();

    const handleCreateGoogleMap = (coords) => {
        if (!coords) return null;

        const map = new google.maps.Map(mapRef.current, {
            center: { lat: coords.latitude, lng: coords.longitude },
            zoom: 12
        });

        new google.maps.Marker({
            position: { lat: coords.latitude, lng: coords.longitude },
            map,
            title: 'a huevo'
        });
    };

    useEffect(() => {
        handleCreateGoogleMap(coords);
    }, [coords]);

    return <div id="mapContainer" className={styles.map} ref={mapRef}></div>;
};

export default Map;
