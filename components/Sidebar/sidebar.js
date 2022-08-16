import React, { useEffect, useMemo, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import styles from './sidebar.module.css';
import ItemResults from '../ItemResults/itemResults';
import Filters from '../Filters/filters';
import Pagination from '../Pagination';
import {IconSearch} from "../Icons/icons";

const Sidebar = (props) => {
    const {
        activelistItems,
        currentPage,
        handleNextPage,
        handlePrevPage,
        handleChangePage,
        handleSideBarMouseOver,
        handleSideBarMouseOut,
        handleSideBarOnClick,
        handleInputSuggestion,
        handleSelectSuggestion,
        inputSuggestions,
        pageSize,
        suggestions,
        triggerRef,
        elementRef
    } = props;

    const onlyWidth = useWindowWidth();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(onlyWidth <= 768);
    }, [onlyWidth]);

    const suggestion = useMemo(() => {
        if (!suggestions.length) return null;

        return suggestions.map((suggestion, index) => (
            <div
                className={styles.suggestion}
                key={`suggestion-${index}`}
                onClick={handleSelectSuggestion(suggestion)}
            >
                {suggestion.nombre_establecimiento}
            </div>
        ));
    }, [suggestions]);

    return (
        <div className={styles.root}>
            <div className={styles.containerSearch}>
                <div className={styles.jorge}>
                    <div className={styles.contentTextInputName}>
                        <input
                            onChange={handleInputSuggestion}
                            className={styles.textInputName}
                            type="text"
                            placeholder={'Buscar por nombre'}
                            value={inputSuggestions}
                            ref={triggerRef}
                        />
                        {/*<button className={styles.searchBtn}>
                            <IconSearch/>
                        </button>*/}
                    </div>
                    <div className={styles.containerSuggestions} ref={elementRef}>
                        {suggestion}
                    </div>
                </div>
                {isMobile ? (
                    <div>
                        <button className={styles.btnMap}>Map</button>
                    </div>
                ) : (
                    <div className={styles.contentTextInputCity}>
                        <input
                            className={styles.textInputCity}
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
                    handleSideBarOnClick={handleSideBarOnClick}
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
