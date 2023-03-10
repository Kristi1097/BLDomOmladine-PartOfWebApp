import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import VijestiListaPocetna from "./VijestiListaPocetna";
import KalendarPocetna from "./KalendarPocetna";
import ZahtjeviListaPocetna from "./ZahtjeviListaPocetna";
const Home = () => {
    const { error, isPending, data: vijesti } = useFetch(global.urls.links.vijestiPocetna);
   // const {errord,isPendingd,data: dogadjaji}=useFetch('http://localhost:8000/dogadjaji');
    const { error1, isPending1, data: zahtjevi } = useFetch(global.urls.links.zahtjeviPocetna);
    return (
        <div className="content-home">
        <div className="home">
            <div className="pocetna-kalendar">
                <h3></h3>
                {error && <div>{error1}</div>}
                {isPending && <div>Loading...</div>}
               <KalendarPocetna />   
            </div> 
                <div className="pocetna-zahtjevi">
                    <h3>Захтјеви</h3>
                    {error1 && <div>{error1}</div>}
                    {isPending1 && <div>Loading...</div>}
                    {zahtjevi && <ZahtjeviListaPocetna zahtjevi={zahtjevi} />}
                </div>
                <div className="pocetna-vijesti">
                    <h3>Вијести</h3>
                    {error && <div>{error}</div>}
                    {isPending && <div>Loading...</div>}
                    {vijesti && <VijestiListaPocetna vijesti={vijesti} />}
                </div>
            </div>
            </div>
    );
}

export default Home;