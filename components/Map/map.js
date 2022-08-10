import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
const Map = (props) => {
    const { places, mapInstanceRef } = props;
    const { markers, coords } = props;
    const mapRef = useRef();
    const testRef2 = useRef([]);

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

        mapInstanceRef.current.addListener('center_changed', () => {
            console.log(
                'Se cambio en centro: ',
                mapInstanceRef.current.getZoom()
            );
        });

        setMapIsReady(true);
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
                map: mapInstanceRef.current,
                title: place.nombre_establecimiento,
                icon: `https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png`
            });


            marker.addListener('mouseover', () => {
                infoWindow.setContent(`<p styles="{font-weight: bold;}"> ${marker.getTitle()}</p>`);
                infoWindow.open(marker.getMap(), marker);
            });

            marker.addListener('mouseout', () => {
                infoWindow.close();
            });

            const event = marker.addListener('click', () => {
                infoWindow.close();
                infoWindow.setContent(marker.getTitle());
                infoWindow.open(marker.getMap(), marker);
            });

            testRef2.current.push(event);
        });
        // google.maps.event.addDomListener(mapRef.current, 'mouseover', () => {
        //     window.alert('Map was clicked!');
        // });

        setMapIsReady(false);
    }, [mapIsReady]);

    return <div id="mapContainer" className={styles.map} ref={mapRef}></div>;
};

export default Map;
