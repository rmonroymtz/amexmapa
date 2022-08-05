import React, {Fragment, useState} from 'react'
import styles from './warning.module.css'
import {IconAlert, IconX} from "../Icons/icons";

const Warning =()=> {

    const [showWarning, setShowWarning]= useState(true)

    const closeWarning =()=>{
        return setShowWarning(false)
    }

    return(
        <Fragment>
            {showWarning?
                <div className={styles.root}>
                    <span>
                        <IconAlert/>
                    </span>
                    <span className={styles.containerText}>
                        Anuncio importante COVID-19: Durante este época sin precedentes, toma en cuenta que las horas y / o servicios prestados por los Negocios pueden cambiar constantemente; te invitamos a consultar sus redes y comunicarte directamente con ellos para obtener más detalles.
                    </span>
                    <button className={styles.btnClose} onClick={()=>closeWarning()}>
                        <IconX/>
                    </button>
                </div>
            :null}
        </Fragment>
    )
}

export default Warning;
