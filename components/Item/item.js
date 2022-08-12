import React, { Fragment } from 'react';
import styles from './item.module.css';

const Item = ({ onMouseOver, onMouseOut, onClick, ...props }) => {
    return (
        <Fragment>
            <div
                className={styles.itemResult}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
            >
                <div className={styles.typeItem}>{props.type}</div>
                <div className={styles.nameItem}>{props.name}</div>
                <div className={styles.addressItem}>{props.address}</div>
                <div className={styles.addressItem2}>{props.address2}</div>
                <div className={styles.distanceItem}>{props.distance}</div>
            </div>
        </Fragment>
    );
};

export default Item;
