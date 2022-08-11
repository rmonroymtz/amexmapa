import React, { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import styles from './sidebar.module.css';
import ItemResults from '../ItemResults/itemResults';
import Filters from '../Filters/filters';
import Pagination from '../Pagination';

const Sidebar = (props) => {
    const {
        activelistItems,
        currentPage,
        handleNextPage,
        handlePrevPage,
        handleChangePage,
        handleSideBarMouseOver,
        handleSideBarMouseOut,
        pageSize
    } = props;
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
                <ItemResults
                    places={activelistItems}
                    handleSideBarMouseOver={handleSideBarMouseOver}
                    handleSideBarMouseOut={handleSideBarMouseOut}
                    activeItem={props.activeItem}
                    pageSize={pageSize}
                    currentPage={currentPage}
                />
            </div>
            <Pagination
                styles={styles}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handleChangePage={handleChangePage}
                handleSideBarMouseOver={handleSideBarMouseOver}
            />
        </div>
    );
};

export default Sidebar;
