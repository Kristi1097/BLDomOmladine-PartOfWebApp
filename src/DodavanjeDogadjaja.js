import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSplitPane from "react-split-pane";
import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import 'react-notifications/lib/notifications.css';
import {useRef} from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
export function uzmiToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
 }
const DodavanjeDogadjaja = () => {
  const inputRef = useRef(null);
  const { data: sale, error, isPending } = useFetch(global.urls.links.saleURL);
  function checkSala () {
    let saleLista = []
    for (var i in sale) {
      const salaObject = {
        idSala: sale[i].idSala,
        nazivSala: sale[i].naziv
      }
      saleLista.push(salaObject);
    }
    return saleLista;
  };
  function postaviSalu() {
    const saleLista = checkSala();
    let opcije = []
    for (var i in saleLista) {
      opcije.push(<option>{saleLista[i].nazivSala}</option>)
    };
    return opcije;
  };
  const { data: vrste, error3, isPending3 } = useFetch(global.urls.links.vrsteDogadjaja);
  const checkVrsta = () => {
    let vrsteLista = []
    for (var i in vrste) {
      const vrstaObject = {
        idVrsta: vrste[i].idVrsta,
        naziv: vrste[i].naziv
      }
      vrsteLista.push(vrstaObject);
    }
    return vrsteLista;
  };

  function uzmiToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
   }

  function postaviVrstu() {
    const vrsteLista = checkVrsta();

    let opcije = []
    for (var i in vrsteLista) {
      opcije.push(<option>{vrsteLista[i].naziv}</option>)
    };
    return opcije;
  };
  const { data: pokrovitelji, error2, isPending2 } = useFetch(global.urls.links.pokrovitelji);
  const checkPokrovitelj = () => {
    let pokroviteljLista = []
    for (var i in pokrovitelji) {
      const pokroviteljObject = {
        idPokrovitelj: pokrovitelji[i].idPokrovitelj,
        naziv: pokrovitelji[i].naziv
      }
      pokroviteljLista.push(pokroviteljObject);
    }
    return pokroviteljLista;
  };
  function postaviPokrovitelje() {
    const pokroviteljLista = checkPokrovitelj();
    let opcije = []
    for (var i in pokroviteljLista) {
      opcije.push(<option>{pokroviteljLista[i].naziv}</option>)
    };
    return opcije;
  };
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [datumOd, setDatumOd] = useState('');
  const [datumDo, setDatumDo] = useState('');
  const [vrsta, setVrsta] = useState([]);
  const [organizator, setOrganizator] = useState('');
  const [kapacitet, setKapacitet] = useState('');
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPending1, setIsPending] = useState();
  const [datumKreiranja, setDatumKreiranja] = useState('');
  const [sala, setSala] = useState('');
  const headers= {'Authorization': 'Bearer '+uzmiToken()};

  let idDogadjajRasporedVeb =1;
  const [dogadjajRasporedVeb, setDogadjajRasporedVeb] = useState([{ idDogadjajRasporedVeb: 1, idSala: 1, nazivSala: "Хол 1", trajeOd: "", trajeDo: "", zauzetaOd: "", zauzetaDo: "", namjena: "", nazivDogadjaj: naziv }]);
  const { idVrsta } = useParams();
  const [vrstaVeb, setVrstaVeb] = useState([{ idVrsta: 1, naziv: "Изложба" }]);
  const [linkovi, setLinkovi] = useState([]);
  const [idZahtjev, setIdZahtjev] = useState(1);
  const [pokroviteljVeb, setPokroviteljVeb] = useState([{ idPokrovitelj: 1, naziv: "Дом Омладине Бања Лука" }]);
  const [slikaVeb, setSlikaVeb] = useState([{ idSlika: 1, naziv: "" }]);
  const handleInputChange = (e, idDogadjajRasporedVeb) => {
    const { name, value } = e.target;
    const list = [...dogadjajRasporedVeb];
    list[idDogadjajRasporedVeb][name] = value;
    const saleLista = checkSala(); 
    if (name === "nazivSala") {
      for (var i in saleLista) {
        if (saleLista[i].nazivSala === value) {
          list[idDogadjajRasporedVeb]["idSala"] = saleLista[i].idSala;
        }
      }
    }
    setDogadjajRasporedVeb(list);
  };

  const handleRemoveClick = index => {
    const list = [...dogadjajRasporedVeb];
    list.splice(index, 1);
    setDogadjajRasporedVeb(list);
  };

  const handleAddClick = (idDogadjajRasporedVeb) => {
    setDogadjajRasporedVeb([...dogadjajRasporedVeb, { idDogadjajRasporedVeb:Math. floor(Math. random() * (100000 - 1 + 1)) + 1 , idSala: 1, nazivSala: "Хол 1", trajeOd: "", trajeDo: "", zauzetaOd: "", zauzetaDo: "", namjena: "", nazivDogadjaj: naziv }]);
  };
  const handleInputChangeVrsta = (e, idVrsta) => {
    const { name, value } = e.target;
    const list = [...vrstaVeb];
    list[idVrsta][name] = value;
    const vrsteLista = checkVrsta();
    if (name === "naziv") {
      for (var i in vrsteLista) {
        if (vrsteLista[i].naziv === value) {
          list[idVrsta]["idVrsta"] = vrsteLista[i].idVrsta;
        }
      }
    }
    setVrstaVeb(list);
  };
  const handleRemoveClickVrsta = index => {
    const list = [...vrstaVeb];
    list.splice(index, 1);
    setVrstaVeb(list);
  };

  const handleAddClickVrsta = () => {
    setVrstaVeb([...vrstaVeb, { idVrsta: 1, naziv: "Изложба" }]);
  };
  const handleInputChangePokrovitelj = (e, idPokrovitelj) => {
    let { name, value } = e.target;
    const list = [...pokroviteljVeb];
    list[idPokrovitelj][name] = value;
    setPokroviteljVeb(list);
  };

  const handleRemoveClickPokrovitelj = index => {
    const list = [...pokroviteljVeb];
    list.splice(index, 1);
    setPokroviteljVeb(list);
  };


  const handleAddClickPokrovitelj = () => {
    setPokroviteljVeb([...pokroviteljVeb, { idPokrovitelj: 1, naziv: "Дом Омладине Бања Лука" }]);
  };
  const submitForm = () => {
  };
  const [img, setImg] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    //setIsSelected(true);
  };
  const handleSubmission = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    fetch(
      global.urls.links.dodavanjeSlikeDogadjaja,
      {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'Bearer '+uzmiToken()
        }),
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        let naziv = (result.naziv);
        setSlikaVeb({ idSlika: 1, naziv: naziv });
        if(naziv)
        NotificationManager.success('Плакат је успјешно додан !', 'Успјешно!', 2000);
        else
        NotificationManager.info('Провјерите да ли сте одабрали плакат !', 'Унос!', 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        NotificationManager.error('Плакат није успјешно додан !', 'Грешка!');
      });
  };

  const handleDeleteImage = (event) => {
    setSelectedFile(event.target.value = null);
    fetch(
      global.urls.links.dogadjajiSlikeDogadjaja + slikaVeb.naziv,
      {
        method: 'DELETE',
        headers: new Headers({
          'Authorization': 'Bearer '+uzmiToken()
        }),
      }
    )
    .then((result) => {
      NotificationManager.success('Плакат је обрисан !', 'Обрисано !', 2000);
      inputRef.current.value = null;
  })
  .catch((error) => {
      NotificationManager.error('ПЛакат није обрисан! Покушајте поново!', 'Грешка!');
  });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const dogadjaj = { naziv, datumOd, datumDo, kapacitet, linkovi, opis, organizator, datumKreiranja, dogadjajRasporedVeb, vrstaVeb, slikaVeb, pokroviteljVeb };
    fetch(global.urls.links.dogadjaji + idZahtjev, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+uzmiToken()
      }),
      body: JSON.stringify(dogadjaj)
    }).then(() => {
      setIsPending(false);
      navigate('/dogadjajiPrikaz/0');
    })
  }
  return (
    <div className="dodavanjeDogadjaja">
      <h2>Додавање новог догађаја</h2>
      <ReactSplitPane split="vertical" minSize={200} defaultSize={800}>
        <div className="dodavanjeDogadjajaWebApp">
          <form onSubmit={handleSubmit}>
            <label>Унесите ИдЗахтјева:</label>
            <input
              placeholder="ИдЗахтјев"
              type="number"
              required
              value={idZahtjev}
              onChange={(e) => setIdZahtjev(e.target.value)}
            />
            {/* <div style={{ marginTop: 20 }}>{JSON.parse(idZahtjev)}</div>*/}
            <div className="plakat">
              <input ref={inputRef} type="file" name="file" onChange={changeHandler} />
              <button onClick={handleSubmission}>Додај плакат</button>
              <button onClick={handleDeleteImage}>Обриши плакат</button>
            </div>
            <NotificationContainer/>
            
            <label>Унесите назив догађаја:</label>
            <input
              placeholder="Назив догађаја"
              type="text"
              required
              value={naziv}
              onChange={(e) => setNaziv(e.target.value)}
            />
            <label>Означите датум почетка догађаја:</label>
            <input
              type="date"
              required
              value={datumOd}
              onChange={(e) => setDatumOd(e.target.value)}
            />
            <label>Означите датум завршетка догађаја:</label>
            <input
              type="date"
              required
              value={datumDo}
              onChange={(e) => setDatumDo(e.target.value)}
            />
            <label>Врста догађаја: </label>
            {vrstaVeb.map((x, i) => {
              return (
                <div className="vrstaLista" >
                  <select
                    name="naziv"
                    value={x.naziv}
                    onChange={(e) => handleInputChangeVrsta(e, i)}
                    placeholder="Врста догађаја"
                    required
                  >
                    {postaviVrstu()}
                  </select>
                  <div className="btn-box">
                    {vrstaVeb.length !== 1 && <button
                      className="vl10"
                      onClick={() => handleRemoveClickVrsta(i)}>-</button>}
                    {vrstaVeb.length - 1 === i && <button onClick={() => handleAddClickVrsta()}>+</button>}
                  </div>
                </div>
              );
            })}
             {/*<div style={{ marginTop: 20 }}>{JSON.stringify(vrstaVeb)}</div>*/}
             <label>Унесите организатора догађаја:</label>
            <input
              placeholder="Организатор догађаја"
              type="text"
              required
              value={organizator}
              onChange={(e) => setOrganizator(e.target.value)}
            />
            <label>- Термин -</label>
            {dogadjajRasporedVeb.map((x, i) => {
              return (
                <div className="box" >
                  <select
                    name="nazivSala"
                    value={x.nazivSala}
                    onChange={(e) => handleInputChange(e, i)}
                    placeholder="Назив сале"
                    required
                  >
                    {postaviSalu()}
                  </select>
                  <label>Догађај траје од:</label>
                  <input
                    className="t1"
                    type="datetime-local"
                    name="trajeOd"
                    placeholder="Догађај траје од"
                    value={x.trajeOd}
                    onChange={e => handleInputChange(e, i)}
                  />
                  <label>Догађај траје до:</label>
                  <input
                    className="t2"
                    type="datetime-local"
                    name="trajeDo"
                    placeholder="Догађај траје до"
                    value={x.trajeDo}
                    onChange={e => handleInputChange(e, i)}
                  />
                  <label>Почетак заузећа сале:</label>
                  <input
                    className="t3"
                    type="datetime-local"
                    name="zauzetaOd"
                    placeholder="Почетак заузећа"
                    value={x.zauzetaOd}
                    onChange={e => handleInputChange(e, i)}
                  />
                  <label>Завршетак заузећа сале:</label>
                  <input
                    className="t4"
                    type="datetime-local"
                    name="zauzetaDo"
                    placeholder="Завршетак заузећа"
                    value={x.zauzetaDo}
                    onChange={e => handleInputChange(e, i)}
                  />
                  <label>Намјена:</label>
                  <input
                    className="t5"
                    name="namjena"
                    placeholder="Намјена"
                    value={x.namjena}
                    onChange={e => handleInputChange(e, i)}
                  />
                  <div className="btn-box">
                    {dogadjajRasporedVeb.length !== 1 && <button
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}>-</button>}
                    {dogadjajRasporedVeb.length - 1 === i && <button onClick={() => handleAddClick()}>+</button>}
                  </div>
                </div>
              );
            })}
              {/*<div style={{ marginTop: 20 }}>{JSON.stringify(dogadjajRasporedVeb)}</div>*/}
              <label>Унесите број пријављених:</label>
            <input
              placeholder="Број пријављених"
              type="number"
              required
              value={kapacitet}
              onChange={(e) => setKapacitet(e.target.value)}
            />
            <label>Унесите линк за пријаву:</label>
            <input
              placeholder="Линк за пријаву"
              type="url"
              required
              value={linkovi}
              name="linkovi"
              onChange={(e) => setLinkovi(e.target.value)}
            />
            {/*<div style={{ marginTop: 20 }}>{JSON.stringify(linkovi)}</div>*/}
            <label>Унесите опис догађаја:</label>
            <textarea
              placeholder="Опис догађаја"
              required
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
            ></textarea>
            <label>Покровитељи:</label>
            {pokroviteljVeb.map((x, i) => {
              return (
                <div className="pokroviteljLista" >
                  <select
                    name="naziv"
                    value={x.naziv}
                    onChange={(e) => handleInputChangePokrovitelj(e, i)}
                    placeholder="Покровитељ"
                    required
                  >
                    {postaviPokrovitelje()}
                  </select>
                  <div className="btn-box">
                    {pokroviteljVeb.length !== 1 && <button
                      className="vl10"
                      onClick={() => handleRemoveClickPokrovitelj(i)}>-</button>}
                    {pokroviteljVeb.length - 1 === i && <button onClick={() => handleAddClickPokrovitelj()}>+</button>}
                  </div>
                </div>
              );
            })}
            {!isPending && <button value={new Date().toJSON().slice(0, 19)} onClick={(e) => setDatumKreiranja(e.target.value)}>Додај догађај</button>}
            {isPending && <button disabled>Додај догађај</button>}
          </form>
        </div>
        
      </ReactSplitPane>
    </div>
  );
}
export default DodavanjeDogadjaja;