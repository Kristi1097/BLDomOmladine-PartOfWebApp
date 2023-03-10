import {FaDoorOpen,FaLock,FaUserPlus, FaUserLock} from "react-icons/fa";

export const MenuKorisnik = [
  {
    icon:<FaUserPlus/>,
    title: 'Додај администартора',
    path: '/dodavanjeAdministratora',
    cName: 'dropdown-link'
  },
    {
      icon:<FaLock/>,
      title: 'Промјени лозинку',
      path: '/promjeniLozinku',
      cName: 'dropdown-link'
    },
    {
      icon:<FaDoorOpen/>,
      title: 'Одјави се',
      path: '/odjava',
      cName: 'dropdown-link'
    }
  ];