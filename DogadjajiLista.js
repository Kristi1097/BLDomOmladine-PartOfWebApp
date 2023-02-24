import { Link } from "react-router-dom"
const DogadjajiLista = ({dogadjaji}) => {
    let d;
    let strd;
    function changeDatum(d){
      var datum=d.replace('T',' ');
      //console.log(datum);
      return datum;
    };
   
    let imgs = [
        'https://res.cloudinary.com/stealthman22/image/upload/v1586308024/new-portfolio/hero/time-lapse-photography-of-waterfalls-during-sunset-210186.jpg',
        'https://res.cloudinary.com/stealthman22/image/upload/v1586308023/new-portfolio/hero/two-cargo-ships-sailing-near-city-2144905.jpg',
      ];
      let dogadjajiLista = []
      for (var i in dogadjaji) 
      {
        var slika = dogadjaji[i].slikaVeb;
        for(var j in slika) {
        const dogadjajObject = {
          naziv:global.urls.links.dogadjajiSlikeDogadjaja+slika[j].naziv
        }
       dogadjajiLista.push(dogadjajObject);
      }}
     
    return ( 
        <div className="dogadjajiLista">
            {dogadjaji.map((dogadjaj)=>(
            <div className="dogadjaji-dogadjaj" key={dogadjaj.idDogadjaj}>
                <Link to={`/dogadjaji/${dogadjaj.idDogadjaj}`}>
                <div className="slika" key={dogadjaj.idDogadjaj}>
                    
                <img src={global.urls.links.dogadjajiSlikeDogadjaja+dogadjaj.nazivSlika}/>
                </div>
                    <h2>{dogadjaj.naziv}</h2>
                    <p>Термин:{dogadjaj.datumOd}:{dogadjaj.datumDo}</p>
                    {/*<p>Сале: {dogadjaj && saleLista(dogadjaj.dogadjajRasporedVeb)}</p>
                    <span></span>*/}
                    <span>{changeDatum(dogadjaj.datumKreiranja)}</span>
                    <span> {dogadjaj.organizator}</span>
                </Link>
            </div>
             ))}
        </div>
     );
}
 
export default DogadjajiLista;