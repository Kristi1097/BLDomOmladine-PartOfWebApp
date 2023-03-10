import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png'
import {FaLock} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import { useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export function uzmiToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
 }
const PromjeniLozinku= () => {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    //const { idNalog } = JSON.parse(localStorage.getItem('idNalog'));
    //console.log(idNalog);
    const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
  const { data: nalog, error, isPending } = useFetch(global.urls.links.nalozi + user.username);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      let lozinka=newPassword;
      let korisnikoIme=nalog.korisnikoIme;
      let idNalog  = nalog.idNalog;
      const osobaVeb=({idOsoba: nalog.osobaVeb.idOsoba, ime:nalog.osobaVeb.ime,prezime:nalog.osobaVeb.prezime,uloga:nalog.osobaVeb.uloga });
      const noviNalog = { idNalog, korisnikoIme,lozinka,osobaVeb};
      return fetch(global.urls.links.nalozi+idNalog, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+uzmiToken()
      }),
      body: JSON.stringify(noviNalog)
    })
     .then(data => data.json())
     .then(navigate('/'));
    }
  
    return(
      <div className="korisnikOpcije">
        <h1>Промјена лозинке</h1>
        <form onSubmit={handleSubmit}>
        <FaLock/>
          <label>
            <p>Стара лозинка</p>
            <input type="oldPassword" onChange={e => setOldPassword(e.target.value)} />
          </label>
          <label>
            <p>Нова лозинка</p>
            <input type="newPassword" onChange={e => setNewPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit">Промјени</button>
          </div>
        </form>
      </div>
    )
  }
  export default PromjeniLozinku;