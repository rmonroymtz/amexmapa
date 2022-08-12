import { useEffect, useState } from 'react';

export const useFooter = () => {
    const [footer, setFooter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleGetFooter = async () => {
            try {
                const res = await fetch('/api/getFooter');
                const tempData = await res.text();
                const data = tempData.replace(
                    'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/2.14.2/package/dist/img/flags/dls-flag-mx.svg',
                    '/dls-flag-mx.svg'
                );
                setFooter(data);
            } catch (error) {
                setError(error);
            }
        };

        handleGetFooter();
    }, []);

    return { error, footer };
};
