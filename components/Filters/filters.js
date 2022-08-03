import React, {useCallback, useState} from "react";
import styles from "../../styles/Filters.module.css";
import {IconFilter, IconShopSmall, IconX} from "../Icons/icons";

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
                        <div className={styles.div1}>
                            <input type="checkbox"/>
                        </div>
                        <div className={styles.div2}>
                            Shop Small <IconShopSmall/>
                        </div>
                        <div className={styles.div3}>
                            <input type="checkbox"/>
                        </div>
                        <div className={styles.div4}>
                            Nuevo listado
                        </div>
                        <div className={styles.div5}>
                            <input type="checkbox"/>
                        </div>
                        <div className={styles.div6}>
                            Lugares con transacciones recientes
                        </div>
                        <div className={styles.div7}>
                            <input type="checkbox"/>
                        </div>
                        <div className={styles.div8}>
                            Pagos contactless
                        </div>

                        <div className={styles.div9}>
                            CATEGORÍA
                        </div>

                        <div className={styles.div10}>
                            <input type="radio"/>
                        </div>
                        <div className={styles.div11}>
                            Cualquier categoría
                        </div>
                        <div className={styles.div12}>
                            <input type="radio"/>
                        </div>
                        <div className={styles.div13}>
                            Restaurantes
                        </div>
                        <div className={styles.div14}>
                            <input type="radio"/>
                        </div>
                        <div className={styles.div15}>
                            Comrpas
                        </div>
                        <div className={styles.div16}>
                            <input type="radio"/>
                        </div>
                        <div className={styles.div17}>
                            Entretenimiento
                        </div>
                        <div className={styles.div18}>
                            <input type="radio"/>
                        </div>
                        <div className={styles.div19}>
                            Servicios
                        </div>
                        <div className={styles.div20}>
                            <input type="radio"/>
                        </div>
                        <div className={styles.div21}>
                            Viajes
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

                <div className={styles.containerSelect}>
                    <select className={styles.selectOrder} name="" id="">
                        <option value="">
                            Resultados más buscados
                        </option>
                        <option value="">
                            Ordenar por distancia
                        </option>
                    </select>
                </div>

            </div>

        </div>
    )
}

export default Filters;