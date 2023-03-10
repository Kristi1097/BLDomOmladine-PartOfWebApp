import { Link } from "react-router-dom";
const VijestiLista = ({vijesti,title}) => {
    function changeDatum(d){
        var datum=d.replace('T',' ');
        return datum;
      }
    return ( 
    <div className="vijestiLista">
            {vijesti.map((vijest)=> (
                <div className="vijesti-vijest" key={vijest.idVijest}>
                <Link to={`/vijesti/${vijest.idVijest}`}>
                <div className="slika">
                <img src={global.urls.links.vijestiSlikeVijesti+vijest.naslovnaSlika}/>
                </div>
                <h2>{vijest.naslov}</h2>
                <p>{vijest.uvod}</p>
                <span>{changeDatum(vijest.datumKreiranja)}</span>
                </Link>
                <span>{vijest.autor}</span>
                </div>
            ))}
    </div>
    );
}
 
export default VijestiLista;