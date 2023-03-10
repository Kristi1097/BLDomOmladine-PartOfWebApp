import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import img from "./logoDomOmladine.png"
function uzmiToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
 }
const DogadjajiParametri = () => {

  let imgs = [
    'https://res.cloudinary.com/stealthman22/image/upload/v1586308024/new-portfolio/hero/time-lapse-photography-of-waterfalls-during-sunset-210186.jpg',

    'https://res.cloudinary.com/stealthman22/image/upload/v1586308023/new-portfolio/hero/two-cargo-ships-sailing-near-city-2144905.jpg',
  ];
  const { idDogadjaj } = useParams();
  //const { data: dogadjaj, error, isPending } = useFetch('http://localhost:8080/dogadjaji/' + idDogadjaj);
  const { data: dogadjaj, error, isPending } = useFetch(global.urls.links.dogadjaji + idDogadjaj);
  const navigate = useNavigate();
  const handleDelete = (e) => {
    fetch(global.urls.links.dogadjaji+ dogadjaj.idDogadjaj, {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': 'Bearer '+uzmiToken()
      }),
    }).then(() => {
      navigate('/dogadjajiPrikaz/0');
    })
  }

  function getVrsta(v) {
    var vrste = "";
    for (var i in v) {
      vrste += v[i].naziv + " ";
    }
    return vrste;
  }
  function getLinkovi(l) {
    let single = l.split(' ');
    let opcije = []
    {
      for (var i in single)
        opcije.push(<a href={single[i]}>{single[i]}{'\n'}</a>)
    };
    return opcije;
  }
  function saleLista(saleLista) {
    const opcije = new Set(saleLista.map(sala => sala.nazivSala + " "));
    return opcije;
  };
  function getPokrovitelji(p) {
    let opcije = []
    {
      for (var i in p)
      //console.log(p[i].slikaVeb.naziv);
        opcije.push(<img src={global.urls.links.slikePokrovitelja+p[i].slikaVeb.naziv}></img>)
       // console.log(opcije);
      };
    return opcije;
  }
  return (
    <div className="dogadjajiParametri">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {dogadjaj && (
        <article>
          <div className="dogadjajNaslovnaSlika">
            <img src={global.urls.links.dogadjajiSlikeDogadjaja + dogadjaj.slikaVeb.naziv} />
          </div>
          <div className="dogadjajd">
            <h2>{dogadjaj.naziv}</h2>
            <span className="datum">Датум одржавања: {dogadjaj.datumOd} : {dogadjaj.datumDo}</span>
            <span className="vrsta">Врста догађаја: {getVrsta(dogadjaj.vrstaVeb)}</span>
            <span className="organizator">Организатор: {dogadjaj.organizator}</span>
            <span className="sale">Сале: {
              saleLista(dogadjaj.dogadjajRasporedVeb)
            } </span>
            <span className="brojMjesta">Број мјеста: {dogadjaj.kapacitet}</span>
            <div className="linkoviDogadjaj">Линк за пријаву: {getLinkovi(dogadjaj.linkovi)} </div>
            <div className="opisdogadjaja">
              <p1>Опис догађаја: {dogadjaj.opis}</p1>
            </div>
            <span className="pokroviteljh">Покровитељи:</span>
            <div className="pokrovitelji">
             {getPokrovitelji(dogadjaj.pokroviteljVeb)}
             {/* <img src="https://www.banjaluka.rs.ba/wp-content/uploads/2018/03/bl-grb-mali-05-site-right-cyr.png" />
              <img src={img} />*/}
            </div>
            <div>{dogadjaj.body}</div>

            <div>
            </div>
          </div>
          {/*<button onClick={handleEdit}>Измјени</button>*/}
          <button onClick={handleDelete}>Обриши</button>
        </article>
      )}
    </div>
  );
}

export default DogadjajiParametri;