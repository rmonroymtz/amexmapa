import React from 'react'
import styles from '../../styles/Sidebar.module.css'
import ItemResults from "../ItemResults/itemResults";
import Filters from "../Filters/filters";


const Sidebar =()=> {
    
    return (
        <div className={styles.root}>
            <div className={styles.containerSearch}>
                <input className={styles.textInput} type="text" placeholder={'Buscar por nombre'}/>
                <input className={styles.textInput} type="text" placeholder={'Buscar por ciudad'}/>
            </div>
            <Filters/>

            <div className={styles.containerResults}>
                <ItemResults/>
            </div>
            <div className={styles.containerPagination}>
                Pagination
            </div>
        </div>
    )
}

export default Sidebar;
