import { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import styles from '../styles/Home.module.css';
import Header from '../components/Header/header';
import Sidebar from '../components/Sidebar/sidebar';
import Warning from '../components/Warning/warning';
import Details from '../components/Details/details';
import Footer from '../components/Footer';
import Map from '../components/Map';
import useHome from '../hooks/useHome';
import ModalWelcome from '../components/ModalWelcome';
import Opinion from '../components/Opinion';

export default function Home(props) {
    const [isMobile, setIsMobile] = useState(false);
    const onlyWidth = useWindowWidth();

    useEffect(() => {
        setIsMobile(onlyWidth <= 768);
    }, [onlyWidth]);

    const talonProps = useHome();
    const {
        errorConsultPosition,
        currentPosition,
        activelistItems,
        mapInstanceRef,
        places,
        setMarkerPlaces,
        markerPlaces
    } = talonProps;

    if (errorConsultPosition.code) {
        if (errorConsultPosition.code === 1) {
            return 'Bloqueado por el usuario';
        }
        return errorConsultPosition.code;
    }

    return (
        <div className={styles.container}>
            {/*Modal welcome only once open the pageload*/}
            <ModalWelcome />
            {/*Header Mobile/desk*/}
            <Header />
            {/*Button green for new window opinion*/}
            <Opinion />
            {/*Warning message about Covid19*/}
            <Warning />

            {/* Main content */}
            <div className={styles.containerMain}>
                <Sidebar places={activelistItems} {...talonProps} />
                <div className={styles.containerMap}>
                    <Details {...talonProps} />
                    {isMobile ? null : places ? (
                        <Map
                            setMarkerPlaces={setMarkerPlaces}
                            markerPlaces={markerPlaces}
                            mapInstanceRef={mapInstanceRef}
                            coords={currentPosition.coords}
                            places={places}
                        />
                    ) : null}
                </div>
            </div>

            <Footer footer={props.footer} />
        </div>
    );
}
