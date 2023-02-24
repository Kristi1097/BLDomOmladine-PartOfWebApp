import { Link, useParams } from "react-router-dom";
import DogadjajiLista from "./DogadjajiLista";
import useFetch from "./useFetch";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa"
const Dogadjaji = () => {
    const {pageNumber}=useParams();
    var pageLeft=parseInt(pageNumber)+1;
    var pageRight=parseInt(pageNumber)-1;
    function CheckIfRight(){
        if(pageRight < 0)
       {return true;}
       else {
        return false;
       }
    }
    //const {error,isPending,data: dogadjaji}=useFetch('http://localhost:8080/dogadjaji/mjesecDana/'+pageNumber);
    const {error,isPending,data: dogadjaji}=useFetch(global.urls.links.dogadjajiMjesecDana+pageNumber);
    return ( 
        <div className="dogadjaji">
            <h2>Догађаји</h2>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {dogadjaji && <DogadjajiLista dogadjaji={dogadjaji}/>}
            <div className="pageButtonD">
                <Link to={`/dogadjajiPrikaz/${pageLeft}`}><button className="goleft"><FaArrowLeft/></button></Link>
                <Link to={`/dogadjajiPrikaz/${pageRight}`}><button className="goright" disabled={CheckIfRight()}><FaArrowRight/></button></Link>
            </div>
        </div>
     );
}
 
export default Dogadjaji;