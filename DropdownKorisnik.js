import React, { useState } from 'react';
import { MenuKorisnik } from "./MenuKorisnik";
import { Link } from 'react-router-dom';


function DropdownKorisnik() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    return (
      <>
        <ul
          onClick={handleClick}
          className={click ? 'dropdown-menu-korisnik clicked' : 'dropdown-menu-korisnik'}
        >
          {MenuKorisnik.map((item, index) => {
            return (
              <li key={index}>

                <Link
                  className={item.cName}
                  to={item.path}
                  onClick={() => setClick(false)}
                >
                  {item.icon}
                {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
}
 
export default DropdownKorisnik;