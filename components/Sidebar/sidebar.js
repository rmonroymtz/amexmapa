import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import styles from './sidebar.module.css';
import ItemResults from '../ItemResults/itemResults';
import Filters from '../Filters/filters';
import Pagination from '../Pagination';
import { IconSearch } from '../Icons/icons';

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
        elementRef,
        totalPages
    } = props;

    const onlyWidth = useWindowWidth();

    const [isMobile, setIsMobile] = useState(false);
    const inputRef = useRef();

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

    useEffect(() => {
        const autocomplete = new google.maps.places.Autocomplete(
            inputRef.current,
            {
                componentRestrictions: {
                    country: 'mx',
                    fields: ['formatted_address', 'geometry', 'name']
                }
            }
        );

        autocomplete.addListener('place_changed', () => {
            const { geometry } = autocomplete.getPlace();
            console.log( autocomplete.getPlace())
            console.log('Actulizando la locación', geometry.location.lat());
        });
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.containerSearch}>
                <div className={styles.containerSearchBar}>
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
                    <div
                        className={styles.containerSuggestions}
                        ref={elementRef}
                    >
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
                            ref={inputRef}
                            className={styles.textInputCity}
                            // type="text"
                            // placeholder={'Buscar por ciudad'}
                            // value={props.inputPlace}
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
                totalPages={totalPages}
            />
        </div>
    );
};

export default Sidebar;
