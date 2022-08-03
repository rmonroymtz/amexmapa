import { useEffect, useState } from 'react';
const Header = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const handleConsult = async () => {
            try {
                const response = await fetch('/api/getHeader');
                const data = await response.text();

                setData(data);
            } catch (error) {
                console.error(error);
            }
        };

        handleConsult();
    }, []);

    if (!data) return null;

    return <div dangerouslySetInnerHTML={{ __html: data }} />;
};

export default Header;
