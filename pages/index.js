
import styles from '../styles/Home.module.css'
import Header from '../components/Header/header';
import Sidebar from "../components/Sidebar/sidebar";
import Warning from "../components/Warning/warning";
import Details from "../components/Details/details";

export default function Home() {
  return (
    <div class={styles.container}>
      <Header />

      <Warning/>

      <div className={styles.containerMain}>
          <Sidebar/>
          <div className={styles.containerMap}>
              <Details />
              <div>google map</div>
          </div>
      </div>

    {/*Footer Global*/}
    </div>
  )
}
