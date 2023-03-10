import { Link } from "react-router-dom";
const VijestiListaPocetna = ({ vijesti }) => {
    
 /* var slikaURL=('http://192.168.43.26:8080/domSlike/slikeVijesti/');
  let naslovna=slikaURL +vijest.naslovnaSlika;*/
    return (
        <div className="vijestiListaPocetna">
            {vijesti.map((vijest) => (
                <div className="vijesti-vijest-pocetna" key={vijest.idVijest}>
                    <div className="slika">
                    <img src={global.urls.links.vijestiSlikeVijesti+vijest.naslovnaSlika}/>
                    </div>
                    <Link to={`/vijesti/${vijest.idVijest}`}>
                        <h2>{vijest.naslov}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default VijestiListaPocetna;