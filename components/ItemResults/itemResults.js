import { Fragment, useMemo } from 'react';
import styles from './itemResults.module.css';
import { IconNewListing, IconShopSmall } from '../Icons/icons';
import Item from '../Item/item';

const ItemResults = ({ places }) => {
    const formatedPlaces = useMemo(() => {
        if (!places) return null;
        const listOfPlaces = places.map((place, id) => {
            const distance = `${parseFloat(place.distance_km).toFixed(1)} km`;
            return (
                <Item
                    key={`place-${id}`}
                    type={place.type}
                    name={place.nombre_establecimiento}
                    address={place.calle_numero}
                    address2={place.address2}
                    distance={distance}
                    iconListing={place.iconListing}
                    iconShop={place.iconShop}
                />
            );
        });

        return listOfPlaces;
    }, [places]);


    return (
        <div className={styles.root}>
            <div className={styles.placesText}>
                <span className={styles.messagePlacesText}>
                    Estamos haciendo que sea más fácil encontrar negocios
                    abiertos durante COVID-19.
                </span>
                <span>
                    <a href="" className={styles.showPlaces}>
                        Puedes ver lugares con transacciones recientes.
                    </a>
                </span>
            </div>
            <div>{formatedPlaces}</div>
        </div>
    );
};

export default ItemResults;
