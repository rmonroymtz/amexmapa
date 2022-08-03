import React, {Fragment} from 'react'
import styles from "../../styles/Item.module.css";

const Item =(props)=> {

    return(
        <Fragment>
            <div className={styles.itemResult} >
                <div className={styles.typeItem}>
                    {props.type}
                </div>
                <div className={styles.nameItem}>
                    {props.name}
                </div>
                <div className={styles.addressItem}>
                    {props.address}
                </div>
                <div className={styles.addressItem2}>
                    {props.address2}
                </div>
                <div className={styles.distanceItem}>
                    {props.distance}
                </div>
                <div className={styles.iconNewListing}>
                    {props.iconListing}
                </div>
                <div className={styles.iconItem}>
                    {props.iconShop}
                </div>
            </div>
        </Fragment>
    )
}

export default Item;