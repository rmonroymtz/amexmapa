import React  from 'react'
import styles from './sidebar.module.css'
import ItemResults from "../ItemResults/itemResults";
import Filters from "../Filters/filters";
import {useWindowWidth} from "@react-hook/window-size";

const Sidebar =()=> {

    const onlyWidth = useWindowWidth()
    const isMobile = onlyWidth<=768;

    return (
        <div className={styles.root}>
            <div className={styles.containerSearch}>
                <div>
                    <input className={styles.textInput} type="text" placeholder={'Buscar por nombre'}/>
                </div>
                {isMobile?
                    <div>
                        <button className={styles.btnMap}>Map</button>
                    </div>
                    :
                    <div>
                        <input className={styles.textInput} type="text" placeholder={'Buscar por ciudad'}/>
                    </div>
                 }
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
