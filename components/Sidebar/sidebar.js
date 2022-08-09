import React, { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import styles from './sidebar.module.css';
import ItemResults from '../ItemResults/itemResults';
import Filters from '../Filters/filters';

const Sidebar = (props) => {
    const onlyWidth = useWindowWidth();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (onlyWidth <= 768) {
            setIsMobile(true);
        }
        return () => {
            setIsMobile(false);
        };
    }, [onlyWidth]);

    return (
        <div className={styles.root}>
            <div className={styles.containerSearch}>
                <div>
                    <input
                        className={styles.textInput}
                        type="text"
                        placeholder={'Buscar por nombre'}
                    />
                </div>
                {isMobile ? (
                    <div>
                        <button className={styles.btnMap}>Map</button>
                    </div>
                ) : (
                    <div>
                        <input
                            className={styles.textInput}
                            type="text"
                            placeholder={'Buscar por ciudad'}
                        />
                    </div>
                )}
            </div>
            <Filters />

            <div className={styles.containerResults}>
                <ItemResults places={props.places} />
            </div>
            <div className={styles.containerPagination}>Pagination</div>
        </div>
    );
};

export default Sidebar;
