import React, { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import styles from './sidebar.module.css';
import ItemResults from '../ItemResults/itemResults';
import Filters from '../Filters/filters';
import Pagination from '../Pagination';

const Sidebar = (props) => {
    const { currentPage, handleNextPage, handlePrevPage, handleChangePage } =
        props;
    const onlyWidth = useWindowWidth();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(onlyWidth <= 768);
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
                <ItemResults places={props.activelistItems} />
            </div>
            <Pagination
                styles={styles}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handleChangePage={handleChangePage}
            />
        </div>
    );
};

export default Sidebar;
