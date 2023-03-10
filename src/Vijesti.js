import useFetch from "./useFetch";
import VijestiLista from "./VijestiLista";
import {Link,useParams} from "react-router-dom"
import { FaArrowLeft,FaArrowRight } from "react-icons/fa"
const Vijesti = () => {
    const {pageNumberv}=useParams();
    var pageLeft=parseInt(pageNumberv)+1;
    var pageRight=parseInt(pageNumberv)-1;

    function CheckIfRight(){
        if(pageRight<0)
       {return true;}
       else {
        return false;
       }
    }
   //const {error,isPending,data: vijesti}=useFetch('http://localhost:8080/vijesti/mjesecDana/'+pageNumberv)
    const {error,isPending,data: vijesti}=useFetch(global.urls.links.vijestiMjesecDana+pageNumberv)
    return (  
        <div className="vijesti">
            <h2>Вијести</h2>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {vijesti && <VijestiLista vijesti={vijesti}/>}
            <div className="pageButtonV">
                <Link to={`/vijestiPrikaz/${pageLeft}`}><button className="goleft"><FaArrowLeft/></button></Link>
                <Link to={`/vijestiPrikaz/${pageRight}`}><button className="goright" disabled={CheckIfRight()}><FaArrowRight/></button></Link>
            </div>
        </div>
    );
}
 
export default Vijesti;