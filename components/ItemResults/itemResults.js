import React, { Fragment } from 'react';
import styles from './itemResults.module.css';
import { IconNewListing, IconShopSmall } from '../Icons/icons';
import Item from '../Item/item';

const ItemResults = () => {
    const dummyData = [
        {
            type: 'C', // Icon with type of commerce
            name: 'CIENFUEGOS',
            address: 'Calle x por avenida equis',
            address2: 'Merida Yucatan',
            distance: '10km',
            iconListing: <IconNewListing />,
            iconShop: <IconShopSmall /> //icon
        },
        {
            type: 'C', // Icon with type of commerce
            name: 'CIENFUEGOS',
            address: 'Calle x por avenida equis',
            address2: 'Merida Yucatan',
            distance: '10km',
            iconListing: <IconNewListing />,
            iconShop: <IconShopSmall /> //icon
        },
        {
            type: 'C', // Icon with type of commerce
            name: 'CIENFUEGOS',
            address: 'Calle x por avenida equis',
            address2: 'Merida Yucatan',
            distance: '10km',
            iconListing: ' ',
            iconShop: ' ' //icon
        },
        {
            type: 'C', // Icon with type of commerce
            name: 'CIENFUEGOS',
            address: 'Calle x por avenida equis',
            address2: 'Merida Yucatan',
            distance: '10km',
            iconShop: <IconShopSmall /> //icon
        },
        {
            type: 'C', // Icon with type of commerce
            name: 'CIENFUEGOS',
            address: 'Calle x por avenida equis',
            address2: 'Merida Yucatan',
            distance: '10km',
            iconListing: <IconNewListing />,
            iconShop: '' //icon
        },
        {
            type: 'C', // Icon with type of commerce
            name: 'CIENFUEGOS',
            address: 'Calle x por avenida equis',
            address2: 'Merida Yucatan',
            distance: '10km',
            iconShop: <IconShopSmall /> //icon
        },
        {
            type: 'C', // Icon with type of commerce
            name: 'CIENFUEGOS',
            address: 'Calle x por avenida equis',
            address2: 'Merida Yucatan',
            distance: '10km',
            iconListing: <IconNewListing />,
            iconShop: '' //icon
        }
    ];

    const listItems = dummyData.map((item, id) => {
        return (
            <Fragment key={`item-id`}>
                <Item
                    type={item.type}
                    name={item.name}
                    address={item.address}
                    address2={item.address2}
                    distance={item.distance}
                    iconListing={item.iconListing}
                    iconShop={item.iconShop}
                />
            </Fragment>
        );
    });
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
            <div>{listItems}</div>
        </div>
    );
};

export default ItemResults;
