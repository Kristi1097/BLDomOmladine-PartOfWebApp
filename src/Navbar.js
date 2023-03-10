import { Link } from "react-router-dom";
import DropdownVijesti from "./DropdownVijesti";
import React from "react";
import { useState } from "react";
import DropdownDogadjaji from "./DropdownDogadjaji";
import DropdownSale from "./DropdownSale";
import DropdownStatistika from "./DropdownStatistika";
import logo from './logo.png';
import {FaFacebook,FaInstagram,FaUserCircle} from "react-icons/fa";
import DropdownKorisnik from "./DropdownKorisnik";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function hideNavbar() {

}

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [dropdownvijesti, setDropdownVijesti] = useState(false);
    const [dropdowndogadjaji, setDropdownDogadjaji] = useState(false);
    const handleClick = () => setClick(!click);
    const [dropdownSale , setDropdownSale] = useState (false);
    const [dropdownstatistika, setDropdownStatistika] = useState(false);
    const [dropdownkorisnik, setDropdownKorisnik] = useState(false);

    const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
    
    const onMouseEnterKorisnik = () => {
      if (window.innerWidth < 480) {
        setDropdownKorisnik(false);
      } else {
        setDropdownKorisnik(true);
      }
    };
  
    const onMouseLeaveKorisnik = () => {
      if (window.innerWidth < 480) {
        setDropdownKorisnik(false);
      } else {
        setDropdownKorisnik(false);
      }
    };
  
    const onMouseEnterVijesti = () => {
        if (window.innerWidth < 480) {
          setDropdownVijesti(false);
        } else {
          setDropdownVijesti(true);
        }
      };
    
      const onMouseLeaveVijesti = () => {
        if (window.innerWidth < 480) {
          setDropdownVijesti(false);
        } else {
          setDropdownVijesti(false);
        }
      };
      
      const onMouseEnterDogadjaji = () => {
        if (window.innerWidth < 480) {
          setDropdownDogadjaji(false);
        } else {
          setDropdownDogadjaji(true);
        }
      };
    
      const onMouseLeaveDogadjaji = () => {
        if (window.innerWidth < 480) {
          setDropdownDogadjaji(false);
        } else {
          setDropdownDogadjaji(false);
        }
      };

      const onMouseEnterSale = () => {
        if (window.innerWidth < 480) {
          setDropdownSale(false);
        } else {
          setDropdownSale(true);
        }
    };

      const onMouseLeaveSale = () => {
        if (window.innerWidth < 480) {
          setDropdownSale(false);
        } else {
          setDropdownSale(false);
        };
      };

      const onMouseEnterStatistika = () => {
        if (window.innerWidth < 480) {
          setDropdownStatistika(false);
        } else {
          setDropdownStatistika(true);
        }
      };
    
      const onMouseLeaveStatistika = () => {
        if (window.innerWidth < 480) {
          setDropdownStatistika(false);
        } else {
          setDropdownStatistika(false);
        }
      };

    return ( 
        <nav className="navbar">
          
          { 
          <>
        <h1><img src={logo}></img>
        <a href="https://www.facebook.com/Domomladinebl/" target="_blank"><FaFacebook/></a>
        <a href="https://www.instagram.com/dom.omladine.bl/" target="_blank"><FaInstagram/></a>
        <a className="korisnik"  onMouseEnter={onMouseEnterKorisnik}
            onMouseLeave={onMouseLeaveKorisnik}><FaUserCircle/>
            {dropdownkorisnik && <DropdownKorisnik />}
            </a></h1>
        <div className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
            <Link to='/' className='nav-links' >
              Почетна
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnterVijesti}
            onMouseLeave={onMouseLeaveVijesti}
          >
            <Link
              to='/vijestiPrikaz'
              className='nav-links'
              setClick={handleClick}
            >
              Вијести 
            </Link>
            {dropdownvijesti && <DropdownVijesti />}
          </li>
          <li
           className='nav-item'
           onMouseEnter={onMouseEnterDogadjaji}
           onMouseLeave={onMouseLeaveDogadjaji}
          >
            <Link
              to='/dogadjajiPrikaz'
              className='nav-links'
              setClick={handleClick}
            >
              Догађаји
            </Link>
            {dropdowndogadjaji && <DropdownDogadjaji />}
          </li>
          <li className='nav-item'>
            <Link
              to='/kalendarDogadjaja'
              className='nav-links'
            >
              Календар догађаја
            </Link>
          </li>
          <li className='nav-item'
              onMouseEnter={onMouseEnterSale}
              onMouseLeave={onMouseLeaveSale}>
            <Link
              to='/sale/spisak/sala/1'
              className='nav-links'
              setClick={handleClick}
            >
              Сале
            </Link>
            {dropdownSale && <DropdownSale />}
            </li>
            <li className="nav-item">
              <Link 
              to='/zahtjevi/0'
              className="nav-links">
                Захтјеви
              </Link>
            </li>
            <li
            className='nav-item'
            onMouseEnter={onMouseEnterStatistika}
            onMouseLeave={onMouseLeaveStatistika}
          >
            <Link
              to='/statistikaSaleGodisnja'
              className='nav-links'
              setClick={handleClick}
            >
              Статистика
            </Link>
            {dropdownstatistika && <DropdownStatistika />}
          </li>
        </div>
        </>
}
    </nav>
    );
}
                    
export default Navbar;