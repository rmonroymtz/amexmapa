import Script from 'next/script';

const GoogleMapsScript = () => {
    const GOOGLE_MAPS_API_KEY = 'AIzaSyCkQJVTqWuO07_wKGoNe6fewhLgSPmv9_g';
    const source = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;

    return (
        <Script
            type="text/javascript"
            src={source}
            strategy="beforeInteractive"
        />
    );
};

export default GoogleMapsScript;
