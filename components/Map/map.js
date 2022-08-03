import { useEffect, useRef } from 'react';
import styles from './map.module.css';
const Map = (props) => {
    const {markers} = props;
    const mapRef = useRef();

    const handleCreateGoogleMap = () => {
        new google.maps.Map(mapRef.current, {
            center: { lat: 19.8124391, lng: -99.0993173 },
            zoom: 12
        });
    };

    useEffect(() => {
        handleCreateGoogleMap();
    }, []);

    return <div id="mapContainer" className={styles.map} ref={mapRef}></div>;
};

export default Map;
