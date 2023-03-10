import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png'
import { FaUnlockAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
//import {useNavigate} from "react-router-dom"

function loginUser(credentials) {
  return fetch(global.urls.links.prijava, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => {
      if(!data.ok){
          throw Error('Could not fetch the data resource')
      }
      return data.json();
  }).catch(err=>{
    return "error"})

}

function setTokenLogin(userToken) {
  localStorage.setItem('token', JSON.stringify(userToken));
  localStorage.setItem("auth", true);
  //setToken(userToken);
  //toggle();
}

export default function Login({ toggle }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  //const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    if(JSON.stringify(token)!='"error"') {
      setUser({username:username,password:password});
      localStorage.setItem('token', JSON.stringify(token));
      //localStorage.setItem('idNalog',JSON.stringify(token?.idNalog));
    }
    //setTokenLogin(token);
    //localStorage.setItem('token', JSON.stringify(token));
    //localStorage.removeItem('auth');
    //localStorage.setItem('auth', JSON.stringify("true"));
    //toggle();
    navigate('/');
  }

  return (
    <div className="login-wrapper">
      <img src={logo} alt="logo" />
      <form onSubmit={e => handleSubmit(e)}>
        <FaUnlockAlt />
        <label>
          <p>Корисничко име</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Лозинка</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Пријави се</button>
        </div>
      </form>
    </div>
  )
}

/*Login.propTypes = {
  setToken: PropTypes.func.isRequired
};*/