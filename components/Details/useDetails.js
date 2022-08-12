import { useCallback, useEffect, useState } from 'react';

export const useDetails = (props) => {
    const { clickedItem, places, setClickedItem, infowindow } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState(null);

    const handleClose = useCallback(() => {
        infowindow.current.close()
        setIsOpen(false);
        setClickedItem(null);
        setDetails(null);
    }, []);

    /**
     * Useffect listn clicked
     */

    useEffect(() => {
        if (typeof clickedItem !== 'number') return;
        const selectedPlace = places[clickedItem];
        setIsOpen(true);
        setDetails(selectedPlace);
    }, [clickedItem, places]);

    return { isOpen, handleClose, details };
};
