import React, {useCallback, useEffect, useState} from 'react';
import styles from './header.module.css';
import {
    IconAmexSegurosBlue,
    IconAmexSegurosWhite,
    IconHamburguer,
    IconLocation, IconX,
    LogoAmex
} from '../Icons/icons';
import {useWindowWidth} from "@react-hook/window-size";

const Header = () => {

    const onlyWidth = useWindowWidth()
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(onlyWidth<=768);
    }, [onlyWidth])

    const [active, setActive] = useState(false)

    const handleClick = useCallback(()=> {
        setActive(active=>!active)
    },[setActive]);

    const changeColor =  active? styles.active:styles.root;

    const changeIcon = active?styles.iconCloseX: styles.iconHamburguer;

    return (
        <div className={changeColor }>
            {isMobile?
                <>
                    {active?
                        <div className={styles.backgroundBlack}>
                            <div className={styles.links}>
                                <a className={styles.contentLocation} href={'#'}>
                                    <IconLocation />
                                    <span>Mapa</span>
                                </a>
                            </div>
                        </div>:null
                    }
                    <div className={styles.containerIconsMobile}>
                        <div className={changeIcon} onClick={handleClick}>
                            {active ? <IconX className={styles.iconX} viewBox={'0 0 24 24'}/> :
                                <IconHamburguer/>
                            }
                        </div>
                        <div>
                            {active? <IconAmexSegurosWhite/>:
                                <IconAmexSegurosBlue/>
                            }
                        </div>
                    </div>
                </>
                :
                <>
                    <div className={styles.contentLogo}>
                        <LogoAmex className={styles.logoAmex} />
                    </div>
                    <a className={styles.contentLocation} href={'#'}>
                        <IconLocation />
                        <span>Mapa</span>
                    </a>
                </>
            }
        </div>
    );
};

export default Header;
