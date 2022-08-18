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
        handlePlaceChange,
        inputSuggestions,
        inputPlace,
        setInputPlace,
        pageSize,
        suggestions,
        triggerRef,
        elementRef,
        totalPages,
        handleApplyFilters,
        handleClearFilters,
        categories,
        setCategories,
        places
    } = props;

    const onlyWidth = useWindowWidth();

    const [isMobile, setIsMobile] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        setIsMobile(onlyWidth <= 768);
    }, [onlyWidth]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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

    const btnShowMap = isMobile ? (
        <div className={styles.contentBtnMap}>
            <button className={styles.btnMap}>Map</button>
        </div>
    ) : isModalOpen ? (
        <div className={styles.contentTextInputCity}>
            <input
                className={styles.textInputCity}
                type="text"
                placeholder={'Buscar por ciudad'}
            />
        </div>
    ) : null;

    const modalSearch = isModalOpen
        ? styles.containerModal
        : styles.containerSearch;

    const modalTextInputName = isModalOpen
        ? styles.contentTextInputNameModal
        : styles.contentTextInputName;

    const modalShowBtnMap = isModalOpen ? null : btnShowMap;

    const stylesSearchBarHidden = isModalOpen
        ? styles.searchBarHiddenTrue
        : null;

    const stylesBoxChange = isModalOpen
        ? styles.containerSearchBar
        : styles.containerSearchBarDefault;

    // this constant is only active when the modal is true but is visible behind the modal
    const inputHidden = isModalOpen ? (
        <div className={styles.containerSearch}>
            <div className={stylesSearchBarHidden}>
                <div className={modalTextInputName}>
                    <input
                        onClick={handleShowModal}
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

                {modalShowBtnMap}
                {isModalOpen ? null : isMobile ? null : (
                    <div
                        className={styles.containerSuggestions}
                        ref={elementRef}
                    >
                        {suggestion}
                    </div>
                )}
            </div>
        </div>
    ) : null;

    const inputCity = (
        <div className={styles.contentTextInputCity}>
            <input
                ref={inputRef}
                className={styles.textInputCity}
                value={inputPlace}
                onChange={({ target }) => {
                    setInputPlace(target.value);
                }}
            />
        </div>
    );

    useEffect(() => {
        const autocomplete = new google.maps.places.Autocomplete(
            inputRef.current,
            {
                componentRestrictions: {
                    country: 'mx'
                },
                fields: [
                    'formatted_address',
                    'place_id',
                    'name',
                    'types',
                    'geometry'
                ]
            }
        );

        autocomplete.addListener('place_changed', () =>
            handlePlaceChange(autocomplete)
        );
    }, []);

    return (
        <div className={styles.root}>
            <div className={modalSearch}>
                <div className={stylesBoxChange} onBlur={handleCloseModal}>
                    <div className={modalTextInputName}>
                        <input
                            onClick={isMobile ? handleShowModal : null}
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
                    {isMobile ? null : isModalOpen ? null : (
                        <div className={styles.contentTextInputCity}>
                            {inputCity}
                        </div>
                    )}

                    {isModalOpen ? (
                        <>
                            {inputCity}
                            <div className={styles.containerBtnSearch}>
                                <button className={styles.btnSearch}>
                                    Buscar
                                </button>
                            </div>
                        </>
                    ) : null}
                    {modalShowBtnMap}
                </div>
                {isModalOpen ? (
                    <div
                        className={styles.containerSuggestionsModal}
                        ref={elementRef}
                    >
                        {suggestion}
                    </div>
                ) : isMobile ? null : (
                    <div
                        className={styles.containerSuggestionsModal}
                        ref={elementRef}
                    >
                        {suggestion}
                    </div>
                )}
            </div>
            {inputHidden}
            <Filters
                setCategories={setCategories}
                categories={categories}
                handleApplyFilters={handleApplyFilters}
                handleClearFilters={handleClearFilters}
                activelistItems={places}
            />
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
