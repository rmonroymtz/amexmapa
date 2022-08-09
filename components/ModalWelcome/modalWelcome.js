import React, {useEffect, useState} from 'react';
import styles from './modalWelcome.module.css';
import {IconX} from "../Icons/icons";

const ModalWelcome =()=> {

    const [open, setOpen] = useState(true);

    const [count, setCount] = useState(0);

    useEffect(() => {
        let sessionModal = localStorage.getItem("sessionModal");

        sessionModal ==null? sessionModal = 1: sessionModal=Number(sessionModal)+1

        localStorage.setItem("sessionModal", sessionModal);

        setCount(sessionModal);
    }, []);

    const handleClose = () => {
        setOpen(false)
        setCount(1)
    }

    return (
        <>
            {count>0 && count<2?
                <>
                    {open?
                        <div className={styles.root} id={"modalWelcome"}>
                            <div className={styles.contentModal}>
                                <div className={styles.contentIconX}>
                                    <button onClick={handleClose} className={styles.btnClose} >
                                        <IconX className={styles.iconX} viewBox={ '0 0 24 24'} />
                                    </button>
                                </div>
                                <div className={styles.titleModal}>
                                    Es tiempo de apoyar a los Negocios Locales.
                                </div>
                                <div className={styles.textModal}>
                                    Explora los que están cerca de ti en donde Tu Tarjeta es bienvenida.
                                </div>
                                <div className={styles.imgModal}>

                                </div>
                                <div className={styles.contentBtnExplore}>
                                    <button className={styles.btnExplore} onClick={handleClose}>
                                        Explora nuevos lugares
                                    </button>
                                </div>
                            </div>
                        </div>:null
                    }
                </>:null
            }
        </>
    )
}

export default ModalWelcome;
