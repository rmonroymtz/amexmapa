import React, {Fragment, useState} from 'react'
import styles from "./details.module.css";
import {IconShopSmall, IconPhone, IconShare, IconChevronLeft} from "../Icons/icons";

const Details =(props)=> {

    const [seeLess, setSeeLess] = useState(true)

    const close=()=> {
        setSeeLess(false)
    }

    const visitText = 'Nota: Los horarios y servicios pueden variar debido a COVID-19. Te recomendamos consultar directamente con el Establecimiento para más detalles.'

    return (
        <Fragment>
            {
                seeLess?
                    <div className={styles.root}>
                        <div className={styles.containerBackButton}>
                            <button className={styles.btnSeeLess} onClick={close}>
                                <IconChevronLeft className={styles.iconChevronLeft}/>
                                 Ver menos
                            </button>
                            <button className={styles.btnShare}>
                                <IconShare className={styles.iconShare}/>
                            </button>
                        </div>

                        <div>
                            <div className={styles.containerNameDistance}>
                                <div className={styles.name}>
                                    {props.name}
                                    FARMACIA GUADALAJARA
                                </div>
                                <div className={styles.distance}>
                                    {props.distance}
                                    100+ km
                                </div>
                            </div>

                            {/*Comments need ternary operator for validation*/}
                                <div className={styles.containerComments}>
                                    <div className={styles.titleComment}>
                                        Comentarios
                                    </div>
                                    <div className={styles.textComment}>
                                        <div>
                                            <IconShopSmall/>
                                        </div>
                                        <div>
                                            Encuentra Comercios Locales cerca de ti y apóyalos con tus compras.
                                        </div>
                                    </div>
                                </div>
                            {/**/}
                            <div className={styles.containerVisitText}>
                                <span className={styles.visit}>
                                    Visita
                                </span>
                                <p className={styles.visitText}>
                                    {visitText}
                                </p>
                            </div>
                        </div>
                        <div className={styles.containerLocationContact}>
                            <a href="#" className={styles.btnLocation} target="_blank">
                                <div className={styles.iconLocation}></div>
                                <div className={styles.address}>
                                    {props.address}
                                    CARRETERA NACIONAL 6091 A, LOS CRISTALES
                                    MONTERREY, NUEVO LEON 6485
                                </div>
                            </a>
                            <div className={styles.titleContact}>
                                Contacto
                            </div>
                            <a href="tel:5551234567" className={styles.btnContact} target="_blank">
                                <div>
                                    <IconPhone className={styles.iconPhone}/>
                                </div>
                                <div className={styles.address}>
                                    {props.phone}
                                    5551234567
                                </div>
                            </a>
                        </div>
                    </div>
                    :null
            }
        </Fragment>
    )
}

export default Details;
