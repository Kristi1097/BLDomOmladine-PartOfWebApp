import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Vijesti from './Vijesti';
import Dogadjaji from './Dogadjaji';
import KalendarDogadjaja from './KalendarDogadjaja';
import Sale from './Sale';
import VijestiParametri from './VijestiParametri';
import DodavanjeVijesti from './DodavanjeVijesti';
import DodavanjeDogadjaja from './DodavanjeDogadjaja';
import SaleZauzetost from './SaleZauzetost'
import Zahtjevi from './Zahtjevi'
import ZahtjevPrikaz from './ZahtjevPrikaz';

import { GodisnjaStatistikaPregledaDogadjaja } from './GodisnjaStatistikaPregledaDogadjaja';
import { MjesecnaStatistikaPregledaDogadjaja } from './MjesecnaStatistikaPregledaDogadjaja';
import { SedmicnaStatistikaPregledaDogadjaja } from './SedmicnaStatistikaPregledaDogadjaja';
import { GodisnjaStatistikaPregledaVijesti } from './GodisnjaStatistikaPregledaVijesti';
import { MjesecnaStatistikaPregledaVijesti } from './MjesecnaStatistikaPregledaVijesti';
import { SedmicnaStatistikaPregledaVijesti } from './SedmicnaStatistikaPregledaVijesti';
import { GodisnjaStatistikaZauzetostiSala } from './GodisnjaStatistikaZauzetostiSala';
import { MjesecnaStatistikaZauzetostiSala } from './MjesecnaStatistikaZauzetostiSala';
import { SedmicnaStatistikaZauzetostiSala } from './SedmicnaStatistikaZauzetostiSala';
import { Navigate } from 'react-router-dom';
// import SaleEdit from './SaleEdit'
import { Link } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
import DogadjajiParametri from './DogadjajiParametri';
import DodavanjePokrovitelja from './DodavanjePokrovitelja';
import DodavanjeAdministratora from './DodavanjeAdministratora';
import PromjeniLozinku from './PromjeniLozinku';
import Odjava from './Odjava';
import { Routes } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from './AuthContext';
import { useContext } from "react";
import { Fragment } from 'react';
import SharedLayout from './SharedLayout';
import PageNotFound from './PageNotFound';

export function getToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  //const {token, setToken} = useToken();
  /*let token=getToken();
  if(!token) {
   return <Login setToken={setToken} />
  }*/
  const [token, setToken] = useState(getToken());
  const [isOpened, setIsOpened] = useState(false);
  const { user } = useContext(AuthContext) || {};
  //console.log("blaaa");
  // localStorage.setItem('auth', JSON.stringify("false"));
  function toggle() {
    setIsOpened(wasOpened => !wasOpened);
  }
  function setTokenLogin(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
    if (userToken) { localStorage.setItem("auth", true); }
    //setToken(userToken);
    toggle();
  }
  return (
    <Routes>
      <Route path="/prijava" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<ProtectedRoute user={user}>
        <Home />
        </ProtectedRoute>} />
        {/*<Route exact path="/">
            {((JSON.parse(localStorage.getItem('auth'))) === "true") ? <Navigate to="/prijava" /> : <Navigate to="/pocetna" />}
          </Route>
          <Route exact path="/pocetna">
            <Home />
  </Route>*/}
        <Route path="/dodavanjeAdministratora"
          element={<ProtectedRoute user={user}>
            <DodavanjeAdministratora />
          </ProtectedRoute>} />
        <Route path="/promjeniLozinku"
          element={<ProtectedRoute user={user}>
            <PromjeniLozinku exact />
          </ProtectedRoute>} />
        <Route path="/odjava"
          element={<ProtectedRoute user={user}>
            <Odjava />
          </ProtectedRoute>} />
        <Route path="/vijesti/:idVijest"
          element={<ProtectedRoute user={user}>
            <VijestiParametri />
          </ProtectedRoute>} />
        <Route path="/vijestiPrikaz/:pageNumberv"
          element={<ProtectedRoute user={user}>
            <Vijesti />
          </ProtectedRoute>} />
        <Route path="/vijestiPrikaz"
          element={<ProtectedRoute user={user}>
            <Navigate to="/vijestiPrikaz/0" />
          </ProtectedRoute>} />
        <Route path="/dodavanjeVijesti"
          element={<ProtectedRoute user={user}>
            <DodavanjeVijesti />
          </ProtectedRoute>} />
        <Route path="/dogadjaji/:idDogadjaj"
          element={<ProtectedRoute user={user}>
            <DogadjajiParametri />
          </ProtectedRoute>} />
        <Route path="/dogadjajiPrikaz/:pageNumber"
          element={<ProtectedRoute user={user}>
            <Dogadjaji />
          </ProtectedRoute>} />
        <Route path="/dogadjajiPrikaz"
          element={<ProtectedRoute user={user}>
            <Navigate to="/dogadjajiPrikaz/0" />
          </ProtectedRoute>} />
        <Route path="/dodavanjeDogadjaja"
          element={<ProtectedRoute user={user}>
            <DodavanjeDogadjaja />
          </ProtectedRoute>} />
        <Route path="/dodavanjePokrovitelja"
          element={<ProtectedRoute user={user}>
            <DodavanjePokrovitelja />
          </ProtectedRoute>} />
        <Route path="/kalendarDogadjaja"
          element={<ProtectedRoute user={user}>
            <KalendarDogadjaja />
          </ProtectedRoute>} />
        {/* <Route path="/sale/spisak/sala/:id/edit">
            <SaleEdit />
          </Route> */}
        <Route path="/sale/spisak/sala/:idSala"
          element={<ProtectedRoute user={user}>
            <Sale />
          </ProtectedRoute>} />
        <Route path="/sale/zauzetost/sala/:idSala"
          element={<ProtectedRoute user={user}>
            <SaleZauzetost />
          </ProtectedRoute>} />
        <Route path="/zahtjevi/zahtjev/:idZahtjev"
          element={<ProtectedRoute user={user}>
            <ZahtjevPrikaz />
          </ProtectedRoute>} />
        <Route path="/zahtjevi/:pageNum"
          element={<ProtectedRoute user={user}>
            <Zahtjevi />
          </ProtectedRoute>} />
        <Route path="/statistikaSaleGodisnja/:id"
          element={<ProtectedRoute user={user}>
            <GodisnjaStatistikaZauzetostiSala />
          </ProtectedRoute>} />
        <Route path="/statistikaSaleGodisnja"
          element={<ProtectedRoute user={user}>
            <Navigate to="/statistikaSaleGodisnja/0" />
          </ProtectedRoute>} />
        <Route path="/statistikaSaleMjesecna/:id"
          element={<ProtectedRoute user={user}>
            <MjesecnaStatistikaZauzetostiSala />
          </ProtectedRoute>} />
        <Route path="/statistikaSaleMjesecna"
          element={<ProtectedRoute user={user}>
            <Navigate to="/statistikaSaleMjesecna/0" />
          </ProtectedRoute>} />
        <Route path="/statistikaSaleSedmicna/:id"
          element={<ProtectedRoute user={user}>
            <SedmicnaStatistikaZauzetostiSala />
          </ProtectedRoute>} />
        <Route path="/statistikaSaleSedmicna"
          element={<ProtectedRoute user={user}>
            <Navigate to="/statistikaSaleSedmicna/0" />
          </ProtectedRoute>} />
        <Route path="/statistikaVijestiSedmicna/:id"
          element={<ProtectedRoute user={user}>
            <SedmicnaStatistikaPregledaVijesti />
          </ProtectedRoute>} />
        <Route path="/statistikaVijestiSedmicna"
          element={<ProtectedRoute user={user}>
            <Navigate to="/statistikaVijestiSedmicna/0" />
          </ProtectedRoute>} />
        <Route path="/statistikaVijestiMjesecna/:id"
          element={<ProtectedRoute user={user}>
            <MjesecnaStatistikaPregledaVijesti />
          </ProtectedRoute>} />
        <Route path="/statistikaVijestiMjesecna"
          element={<ProtectedRoute user={user}>
            <Navigate to="/statistikaVijestiMjesecna/0" />
          </ProtectedRoute>} />
        <Route path="/statistikaVijestiGodisnja/:id"
          element={<ProtectedRoute user={user}>
            <GodisnjaStatistikaPregledaVijesti />
          </ProtectedRoute>} />
        <Route path="/statistikaVijestiGodisnja"
          element={<ProtectedRoute user={user}>
            <Navigate to="/statistikaVijestiGodisnja/0" />
          </ProtectedRoute>} />
        <Route path="/statistikaDogadjajaGodisnja/:id"
          element={<ProtectedRoute user={user}>
            <GodisnjaStatistikaPregledaDogadjaja />
          </ProtectedRoute>} />
        <Route path="/statistikaDogadjajaGodisnja"
          element={<ProtectedRoute user={user}>
            <Navigate to="/statistikaDogadjajaGodisnja/0" />
          </ProtectedRoute>} />
        <Route path="/statistikaDogadjajaMjesecna/:id"
          element={<ProtectedRoute user={user}>
            <MjesecnaStatistikaPregledaDogadjaja />
          </ProtectedRoute>} />
        <Route path="/statistikaDogadjajaMjesecna"
          element={<ProtectedRoute user={user}>
            <Navigate to="/statistikaDogadjajaMjesecna/0" />
          </ProtectedRoute>} />
        <Route path="/statistikaDogadjajaSedmicna/:id"
          element={<ProtectedRoute user={user}>
            <SedmicnaStatistikaPregledaDogadjaja />
          </ProtectedRoute>} />
        <Route path="/statistikaDogadjajaSedmicna"
          element={<ProtectedRoute user={user}>
            <Navigate to="/statistikaDogadjajaSedmicna/0" />
          </ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
