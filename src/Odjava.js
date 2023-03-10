import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png'
import {FaLock} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import App from './App';
import token from './App';
import  uzmiToken from './uzmiToken';
import Login from './Login';
import ReactDOM from 'react-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Odjava= (toggle) => {
    const navigate = useNavigate();
    const { user, setUser, setIsLoggedIn } = useContext(AuthContext);

    function setToken(userToken) {
      localStorage.setItem('token', JSON.stringify(userToken));
    }
    
    /*async function odjavi() {
        return fetch('http://localhost:8080/odjava', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer 'x+uzmiToken()
          }
        })
         .then(data => data.json())
         .then(setToken(null))
         .then(navigate('/'));
       
       }*/

       function odjavi() {
        setUser("");
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        //localStorage.removeItem('auth');
        //localStorage.setItem('auth',JSON.stringify("false"));
        //setToken('');
        //ReactDOM.render(<App></App>);
        //toggle();
        navigate('/prijava');
        
       }
    const handleSubmit = () => {
      //e.preventDefault();
      odjavi();
      //odjavi();
      /*const token = await addUser({
        username,
        password
      });
     setToken(token);*/
    }
  
    return(
      <div className="Odjava">
      {odjavi()}
    </div>
    )
  }

  export default Odjava;
  