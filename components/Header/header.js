import React from 'react';
import styles from '../../styles/Header.module.css';
import { IconLocation, LogoAmex } from '../Icons/icons';

const Header = () => {
    return (
        <div className={styles.root}>
            <span className={styles.contentLogo}>
                <LogoAmex />
            </span>
            <a className={styles.contentLocation} href={'#'}>
                <IconLocation />
                <span>Mapa</span>
            </a>
        </div>
    );
};

export default Header;
