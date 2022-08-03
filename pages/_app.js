import { Fragment } from 'react';
import GoogleMapsScript from '../components/Map/googleMapsScript';
import '../styles/normalize.css';

function MyApp({ Component, pageProps }) {
    return (
        <Fragment>
            <GoogleMapsScript />
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp;
