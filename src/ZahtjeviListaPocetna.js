import { Link } from "react-router-dom";
import { useState } from "react";

const ZahtjeviListaPocetna = ({zahtjevi}) => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    return (
        <div className="zahtjeviListaPocetna">
            {zahtjevi.map((zahtjev) => (
                <div className="zahtjevi-zahtjev-pocetna" key={zahtjev.idZahtjev}>
                    <Link to={`/zahtjevi/zahtjev/${zahtjev.idZahtjev}`}
                          setClick={handleClick}>
                    <h4>{ zahtjev.naziv }</h4>
                    <p> Организатор:{ zahtjev.organizator }</p>
                    
                    {/* <p>Вријеме:</p>
                    <p> { zahtjev.vrijemе }</p> */}
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default ZahtjeviListaPocetna;
