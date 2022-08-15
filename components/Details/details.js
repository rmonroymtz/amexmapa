import React, {Fragment, useEffect, useState} from 'react';
import { useDetails } from './useDetails';
import styles from './details.module.css';
import {
    IconPhone,
    IconShare,
    IconChevronLeft
} from '../Icons/icons';
import {useWindowWidth} from "@react-hook/window-size";

const Details = (props) => {

    const [isMobile, setIsMobile] = useState(false);
    const onlyWidth = useWindowWidth();
    useEffect(() => {
        setIsMobile(onlyWidth <= 768);
    }, [onlyWidth]);


    const talonProps = useDetails({
        clickedItem: props.clickedItem,
        places: props.places,
        setClickedItem: props.setClickedItem,
        infowindow: props.refInfoWindowOnClick
    });

    const { isOpen, handleClose, details } = talonProps;

    const visitText =
        'Nota: Los horarios y servicios pueden variar debido a COVID-19. Te recomendamos consultar directamente con el Establecimiento para más detalles.';

    if (!details){
        return ''
    }

    const distance = `${parseFloat(details.distance_km).toFixed(1)} km`;

    let latitude = details.latitude;
    let longitude = details.longitude;

    const baseUrlGoogle = 'https://www.google.com/maps/dir/?api=1&destination='

    const locationApi = baseUrlGoogle + latitude + "," +longitude + "&hl=es-mx";


    return (
        <Fragment>
            {isOpen ? (
                <div className={styles.rootBlack}>
                    <div className={styles.root}>
                        <div className={styles.containerBackButton}>
                            <button
                                className={styles.btnSeeLess}
                                onClick={handleClose}
                            >
                                <IconChevronLeft
                                    className={styles.iconChevronLeft}
                                />
                                {isMobile? 'Regresar a resultados':'Ver menos'}
                            </button>
                            <button className={styles.btnShare}>
                                <IconShare className={styles.iconShare} />
                            </button>
                        </div>

                        <div>
                            <div className={styles.containerNameDistance}>
                                <div className={styles.name}>
                                    {details.nombre_establecimiento}
                                </div>
                                <div className={styles.distance}>
                                    {distance}
                                </div>
                            </div>

                            {/**/}
                            <div className={styles.containerVisitText}>
                                <span className={styles.visit}>Visita</span>
                                <p className={styles.visitText}>{visitText}</p>
                            </div>
                        </div>
                        <div className={styles.containerLocationContact}>
                            <a
                                href={locationApi}
                                className={styles.btnLocation}
                                target="_blank"
                            >
                                <div className={styles.iconLocation}></div>
                                <div className={styles.address}>
                                    {details.calle_numero}
                                </div>
                            </a>
                            <div className={styles.titleContact}>Contacto</div>
                            <a
                                href={'tel:'+details.telefono}
                                rel="noreferrer"
                                className={styles.btnContact}
                                target="_blank"
                            >
                                <div>
                                    <IconPhone className={styles.iconPhone} />
                                </div>
                                <div className={styles.address}>
                                    {details.telefono}
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};

export default Details;
