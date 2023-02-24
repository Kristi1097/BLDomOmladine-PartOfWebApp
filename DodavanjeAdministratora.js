import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png'
import {FaUserPlus} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export function uzmiToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
 }
const DodavanjeAdministratora = () => {
    const [korisnickoIme, setkorisnickoIme] = useState();
    const [lozinka, setLozinka] = useState();
    const [ime,setIme]=useState();
    const [prezime,setPrezime]=useState();
    let idNalog=2;
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      const osobaVeb=({idOsoba: 1, ime:ime,prezime:prezime,uloga:"Администратор" });
      const admin = { idNalog, korisnickoIme, lozinka,osobaVeb};
      return fetch(global.urls.links.nalozi, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+uzmiToken()
      }),
      body: JSON.stringify(admin)
    })
     .then(data => data.json())
     .then(navigate('/'));
    }
    return(
      <div className="korisnikDodajAdmin">
        <h1>Додавање новог администратора</h1>
        <form onSubmit={handleSubmit}>
        <FaUserPlus/>
        <label>
            <p>Име</p>
            <input type="ime" onChange={e => setIme(e.target.value)} />
          </label>
          <label>
            <p>Презиме</p>
            <input type="prezime" onChange={e => setPrezime(e.target.value)} />
          </label>
          <label>
            <p>Корисничко име</p>
            <input type="text" onChange={e => setkorisnickoIme(e.target.value)} />
          </label>
          <label>
            <p>Лозинка</p>
            <input type="password" onChange={e => setLozinka(e.target.value)} />
          </label>
          <div>
            <button type="submit">Додај</button>
          </div>
        </form>
      </div>
    )
  }
  export default DodavanjeAdministratora;