import styles from '../styles/Home.module.css';
import Header from '../components/Header/header';
import Sidebar from '../components/Sidebar/sidebar';
import Warning from '../components/Warning/warning';
import Details from '../components/Details/details';
import Footer from '../components/Footer';
import Map from '../components/Map';
import useHome from '../hooks/useHome';

export default function Home(props) {
    const talonProps = useHome();
    const { errorConsultPosition } = talonProps;

    if(errorConsultPosition.code){
        if(errorConsultPosition.code === 1){
            return 'Bloqueado por el usuario'
        }
        return errorConsultPosition.code;
    }

    return (
        <div className={styles.container}>
            <Header />

            <Warning />

            <div className={styles.containerMain}>
                <Sidebar />
                <div className={styles.containerMap}>
                    <Details />
                    <Map />
                </div>
            </div>

            <Footer footer={props.footer} />
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/getFooter');
    const data = await res.text();
    const newData = data.replace(
        'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/2.14.2/package/dist/img/flags/dls-flag-mx.svg',
        '/dls-flag-mx.svg'
    );
    return {
        props: {
            footer: newData
        }
    };
}
