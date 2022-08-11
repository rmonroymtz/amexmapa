import React, { Fragment } from 'react';
import styles from './item.module.css';

const Item = ({ onMouseOver, onMouseOut, ...props }) => {
    return (
        <Fragment>
            <div
                className={styles.itemResult}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                <div className={styles.typeItem}>{props.type}</div>
                <div className={styles.nameItem}>{props.name}</div>
                <div className={styles.addressItem}>{props.address}</div>
                <div className={styles.addressItem2}>{props.address2}</div>
                <div className={styles.distanceItem}>{props.distance}</div>
                <div className={styles.iconNewListing}>{props.iconListing}</div>
                <div className={styles.iconItem}>{props.iconShop}</div>
            </div>
        </Fragment>
    );
};

export default Item;
