import { Fragment, useMemo } from 'react';
import styles from './itemResults.module.css';
import { IconNewListing, IconShopSmall } from '../Icons/icons';
import Item from '../Item/item';

const ItemResults = ({
    places,
    handleSideBarMouseOver = () => {},
    activeItem,
    handleSideBarMouseOut = () => {},
    handleSideBarOnClick = () => {},
    currentPage,
    pageSize
}) => {
    const formatedPlaces = useMemo(() => {
        if (!places) return null;
        const startIndex = Math.floor(currentPage - 1) * pageSize;
        const listOfPlaces = places.map((place, id) => {
            const distance = `${parseFloat(place.distance_km).toFixed(1)} km`;

            let iconType = '';

            if (place.industria==='Entertainment') {
                iconType = <pan>E</pan>
            } else if (place.industria==='Retail'){
                iconType=<span>R</span>
            } else if(place.industria==='Restaurant'){
                iconType=<span className={styles.iconType}></span>
            } else if(place.industria==='Professional Services'){
                iconType=<span className={styles.iconType}></span>
            }


            return (
                <Item
                    key={`place-${id}`}
                    type={iconType}
                    name={place.nombre_establecimiento}
                    address={place.calle_numero}
                    address2={place.address2}
                    distance={distance}
                    onMouseOver={handleSideBarMouseOver(id + startIndex)}
                    onMouseOut={handleSideBarMouseOut(id + startIndex)}
                    onClick={handleSideBarOnClick(id + startIndex)}
                    active={activeItem === id}
                />
            );
        });

        return listOfPlaces;
    }, [places, activeItem, handleSideBarMouseOver]);


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
