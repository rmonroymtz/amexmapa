import React, {useCallback, useState} from "react";
import styles from "./filters.module.css";
import {IconFilter, IconBag, IconTicket, IconX, IconCutlery, IconServices, IconTrips} from "../Icons/icons";

const Filters =()=>{

    const [showFilters, setShowFilters] = useState(false)

    const show = useCallback(()=> {
        setShowFilters(showFilters=>!showFilters)
    },[setShowFilters])

    return (
        <div>
            {showFilters?
                <div className={styles.btnsFilters}>
                    <div className={styles.btnsCloseErase}>
                        <div>
                            <button className={styles.btnShowLess} onClick={show}>
                                <IconX/> Ver menos
                            </button>
                        </div>
                        <div>
                            <button className={styles.btnErase}>
                                Borrar
                            </button>
                        </div>
                    </div>
                    <div className={styles.parent}>

                        <div className={styles.div9}>
                            CATEGORÍA
                        </div>

                        <div className={styles.containerRadios}>
                            <label  className={styles.container}>
                                Cualquier categoría
                                <input type={'radio'} name={'radio'}/>
                                    <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconCutlery className={styles.iconCutlery} />
                                Restaurantes
                                <input type={'radio'} name={'radio'}/>
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconBag className={styles.iconBag}/>
                                Compras
                                <input type={'radio'} name={'radio'}/>
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconTicket className={styles.iconTicket}/>
                                Entretenimiento
                                <input type={'radio'} name={'radio'}/>
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconServices className={styles.iconServices}/>
                                Servicios
                                <input type={'radio'} name={'radio'}/>
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconTrips className={styles.iconTrips}/>
                                Viajes
                                <input type={'radio'} name={'radio'}/>
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>

                    </div>
                </div>
                :null
            }
            <div className={styles.containerFilters}>
                <div className={styles.containerBtnFilter}>
                    <button className={styles.btnFilter} onClick={show} >
                    <span>
                        <IconFilter/>
                    </span>
                        <span className={styles.textBtnFilter}>
                        Filtros
                    </span>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Filters;
