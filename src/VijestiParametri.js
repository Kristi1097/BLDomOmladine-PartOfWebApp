import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";
import Galerija from "./GalerijaSlikaVijesti";
import React from "react";
const ReactDOM = require('react-dom');
const VijestiParametri = () => {
  const { idVijest } = useParams();
  //const { data: vijest, isPending, error } = useFetch('http://localhost:8080/vijesti/' + idVijest);
  const { data: vijest, isPending, error } = useFetch(global.urls.links.vijesti + idVijest);
  const navigate = useNavigate();
  function changeDatum(d){
    var datum=d.replace('T',' ');
  
    return datum;
  }
  const handleDelete = (e) => {
    fetch(global.urls.links.vijesti + vijest.idVijest, {
      method: 'DELETE',
    }).then(() => {
      navigate('/vijestiPrikaz/0');
    })
  }
  const rootElement = document.getElementById("root");
  return (
    <div className="vijestiParametri">
      {isPending && <div>Loading..</div>}
      {error && <div>{error}</div>}
      {vijest && (
        <article>
          <div className="v1">

            <img src={global.urls.links.vijestiSlikeVijesti + vijest.naslovnaSlika} />
            <h2>{vijest.naslov}</h2>
            <p1>{vijest.uvod}</p1>
          </div>
          {vijest.slika1 != 0 && (
          <div className="v2">
            <img src={global.urls.links.vijestiSlikeVijesti+ vijest.slika1} />
            <p2>{vijest.tekst1}</p2>
          </div>)}
          {vijest.slika2 != 0 && (
          <div className="v3">
            <img src={global.urls.links.vijestiSlikeVijesti + vijest.slika2} />
            <p3>{vijest.tekst2}</p3>
          </div>)}
          {vijest.slikaVeb!=0 &&(
          <div className="galerijaVijest">
            <Galerija vijest={vijest} />
          </div>)}
          {/*<button onClick={handleEdit}>Измјени</button>*/}
          {/*<button onClick={handleDelete}>Обриши</button>*/}
          <div>{changeDatum(vijest.datumKreiranja)}</div>
        </article>
      )}
    </div>
  );
}

export default VijestiParametri;