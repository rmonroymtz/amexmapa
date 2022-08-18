import React, { useCallback, useEffect, useState } from 'react';
import styles from './filters.module.css';
import {
    IconFilter,
    IconBag,
    IconTicket,
    IconX,
    IconCutlery,
    IconServices,
    IconTrips,
    activelistItems
} from '../Icons/icons';

const Filters = (props) => {
    const {
        handleApplyFilters,
        handleClearFilters,
        categories,
        setCategories
    } = props;

    const handleOnChange = useCallback((event) => {
        setCategories(event.target.value);
    }, []);

    const [showFilters, setShowFilters] = useState(false);

    const show = useCallback(() => {
        setShowFilters((showFilters) => !showFilters);
    }, [setShowFilters]);

    return (
        <div>
            {showFilters ? (
                <div className={styles.btnsFilters}>
                    <div className={styles.btnsCloseErase}>
                        <div>
                            <button
                                className={styles.btnShowLess}
                                onClick={show}
                            >
                                <IconX /> Ver menos
                            </button>
                        </div>
                        <div>
                            <button
                                className={styles.btnErase}
                                onClick={() =>
                                    handleClearFilters(setShowFilters)
                                }
                            >
                                Borrar
                            </button>
                        </div>
                    </div>
                    <div className={styles.parent}>
                        <div className={styles.div9}>CATEGORÍA</div>

                        <div className={styles.containerRadios}>
                            <label className={styles.container}>
                                Cualquier categoría
                                <input
                                    onClick={handleOnChange}
                                    type={'radio'}
                                    name={'all'}
                                    value=""
                                    checked={categories === ''}
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconCutlery className={styles.iconCutlery} />
                                Restaurantes
                                <input
                                    type={'radio'}
                                    name={'restaurant'}
                                    value="restaurant"
                                    checked={categories === 'restaurant'}
                                    onClick={handleOnChange}
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconBag className={styles.iconBag} />
                                Compras
                                <input
                                    type={'radio'}
                                    name={'retail'}
                                    value="retail"
                                    onClick={handleOnChange}
                                    checked={categories === 'retail'}
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconTicket className={styles.iconTicket} />
                                Entretenimiento
                                <input
                                    type={'radio'}
                                    name={'entertainment'}
                                    value="entertainment"
                                    checked={categories === 'entertainment'}
                                    onClick={handleOnChange}
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconServices className={styles.iconServices} />
                                Servicios
                                <input
                                    type={'radio'}
                                    name={'services'}
                                    value="services"
                                    onClick={handleOnChange}
                                    checked={'services' === categories}
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                            <label className={styles.container}>
                                <IconTrips className={styles.iconTrips} />
                                Viajes
                                <input
                                    type={'radio'}
                                    name={'travel'}
                                    value="travel"
                                    onClick={handleOnChange}
                                    checked={'travel' === categories}
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>
                    </div>
                    <button onClick={() => handleApplyFilters(setShowFilters)}>
                        Aplicar Filtros
                    </button>
                </div>
            ) : null}
            <div className={styles.containerFilters}>
                <div className={styles.containerBtnFilter}>
                    <button className={styles.btnFilter} onClick={show}>
                        <span>
                            <IconFilter />
                        </span>
                        <span className={styles.textBtnFilter}>Filtros</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filters;
