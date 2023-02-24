import { useState } from "react";
import ReactSplitPane from "react-split-pane";
import { useNavigate } from "react-router-dom";
import RUG from "react-upload-gallery";
import "react-upload-gallery/dist/style.css";
import GalerijaUploadVijesti from "./GalerijaUploadVijesti";
import 'react-notifications/lib/notifications.css';
import {useRef} from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export function uzmiToken() {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
 }
const DodavanjeVijesti = () => {
  const [naslov, setNaslov] = useState('');
  const [uvod, setUvod] = useState('');
  const [tekst1, setTekst1] = useState('');
  const [tekst2, setTekst2] = useState('');
  const [datumKreiranja, setDatumKreiranja] = useState();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [naslovnaSlika, setNaslovnaSlika] = useState('');
  const [slika1, setSlika1] = useState('');
  const [slika2, setSlika2] = useState('');
  const [nazivSlika1, setNazivSlika1] = useState('');
  const [nazivSlika2, setNazivSlika2] = useState('');
  const [images, setImages] = useState([]);
  const [slikaVeb, setSlikaVeb] = useState([]);
  const [imageName, setImageName] = useState('');
  const [count, setCount] = useState(1);
  const inputRef = useRef(null);
  const headers= {'Authorization': 'Bearer '+uzmiToken()};
  //let images=[];
  //let slikaVeb=[];
  function setImageNameF(naziv) {
    //console.log(naziv);
    setImages(old => [...old, naziv]);
    for (var i in images) {
      setSlikaVeb(old => [...old, { idSlika: i, naziv: images[i] }]);
    }
    // images.push(naziv);
    //console.log(images.naziv);
    //console.log(naziv);
  }
  function copyImageNames() {
    const list = [...slikaVeb];
    //console.log(images);
    for (var i in images) {
      /* const imObject = {
         idSlika: i,
         naziv: images[i]
       }*/
      //console.log(i);
      // console.log(images[i]);
      // slikaVeb.push(imObject);
      setSlikaVeb(old => [...old, images[i]]);

      //console.log(i + " " + images[i]);
    }
    //setSlikaVeb(list);
  }


  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    //setIsSelected(true);
  };
  const handleSubmission = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    fetch(
      global.urls.links.dodavanjeSlikeVijesti,
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
        setNaslovnaSlika(result.naziv);
        NotificationManager.success('Фотографија1 је успјешно додана !', 'Успјешно!', 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        NotificationManager.error('Фотографија1 није успјешно додана !', 'Грешка!');
      });
  };
  const handleDeleteImage = (event) => {
    inputRef.current.value = null;
    setSelectedFile(event.target.value = null);
    fetch(
      global.urls.links.vijestiSlikeVijesti+ naslovnaSlika,
      {
        method: 'DELETE',
        headers: new Headers({
          'Authorization': 'Bearer '+uzmiToken()
        }),
      }
    )

  };
 
  const changeHandler1 = (event) => {
    setSelectedFile1(event.target.files[0]);
    //setIsSelected(true);
  };
  const handleSubmission1 = () => {
    const formData = new FormData();
    formData.append('file', selectedFile1);
    fetch(
      global.urls.links.dodavanjeSlikeVijesti,
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
        setSlika1(result.naziv);
        NotificationManager.success('Фотографија2 је успјешно додана !', 'Успјешно!', 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        NotificationManager.error('Фотографија2 није успјешно додана !', 'Грешка!');
      });
  };
  const handleDeleteImage1 = (event) => {
    inputRef.current.value = null;
    setSelectedFile1(event.target.value = null);
    fetch(
      global.urls.links.vijestiSlikeVijesti + slika1,
      {
        method: 'DELETE',
        headers: new Headers({
          'Authorization': 'Bearer '+uzmiToken()
        }),
      }
    )

  };
  const changeHandler2 = (event) => {
    setSelectedFile2(event.target.files[0]);
    //setIsSelected(true);
  };
  const handleSubmission2 = () => {
    const formData = new FormData();
    formData.append('file', selectedFile2);
    fetch(
      global.urls.links.dodavanjeSlikeVijesti,
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
        setSlika2(result.naziv);
                NotificationManager.success('Фотографија3 је успјешно додана !', 'Успјешно!', 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        NotificationManager.error('Фотографија3 није успјешно додана !', 'Грешка!');
      });
  };
  const handleDeleteImage2 = (event) => {
    inputRef.current.value = null;
    setSelectedFile2(event.target.value = null);
    fetch(
      global.urls.links.vijestiSlikeVijesti + slika2,
      {
        method: 'DELETE',
        headers: new Headers({
          'Authorization': 'Bearer '+uzmiToken()
        }),
      }
    )
   
  };
  const submitForm = () => {

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let datumKreiranja = new Date().toJSON().slice(0, 19);
    setDatumKreiranja(datumKreiranja);
    setIsPending(true);
    const vijest = { naslov, naslovnaSlika, uvod, slika1, tekst1, slika2, nazivSlika1, nazivSlika2, datumKreiranja, tekst2, slikaVeb };
    fetch(global.urls.links.dodavanjeVijesti, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+uzmiToken()
      }),
      body: JSON.stringify(vijest)
    }).then(() => {
      setIsPending(false);
      navigate('/vijestiPrikaz');
    })
  }
  return (
    <div className="dodavanjeVijesti">
      <h2>Додавање нове вијести</h2>
      <ReactSplitPane split="vertical" minSize={200} defaultSize={800}>
        <div className="dodavanjeVijestiWebApp">
          {/*<form onSubmit={handleSubmit}>*/}
          <div className="dodajv1">
            <label>*Секција 1:</label>
            <input
              placeholder="Унесите наслов вијести"
              type="text"
              required
              value={naslov}
              onChange={(e) => setNaslov(e.target.value)}
            />
            <input ref={inputRef} type="file" name="file" onChange={changeHandler} />
            <button onClick={handleSubmission}>Додај слику</button>
            <button onClick={handleDeleteImage}>Обриши слику</button>
            <NotificationContainer/>
            <textarea
              placeholder="Унесите увод"
              required="required"
              maxLength="500"
              value={uvod}
              onChange={(e) => setUvod(e.target.value)}
            ></textarea>

          </div>
          <div className="dodajv2">
            <label>Секција 2:</label>
            <input
              placeholder="Унесите назив слике"
              type="text"
              required
              value={nazivSlika1}
              onChange={(e) => setNazivSlika1(e.target.value)}
            />
            <input ref={inputRef} type="file" name="file" onChange={changeHandler1} />
            <button onClick={handleSubmission1}>Додај слику</button>
            <button onClick={handleDeleteImage1}>Обриши слику</button>
            <NotificationContainer/>
          <textarea
            placeholder="Унесите текст вијести"
            value={tekst1}
            maxLength="5000"
            onChange={(e) => setTekst1(e.target.value)}
          ></textarea>
          </div>
          <div className="dodajv3">
            <label>Секција 3:</label>
            <input
              placeholder="Унесите назив слике"
              type="text"
              required
              value={nazivSlika2}
              onChange={(e) => setNazivSlika2(e.target.value)}
            />
            <input ref={inputRef} type="file" name="file" onChange={changeHandler2} />
            <button onClick={handleSubmission2}>Додај слику</button>
            <button onClick={handleDeleteImage2}>Обриши слику</button>
            <NotificationContainer/>
          <textarea
            placeholder="Унесите текст вијести"
            value={tekst2}
            maxLength="5000"
            onChange={(e) => setTekst2(e.target.value)}
            required
          ></textarea>
          </div>
          <div className="uploadGalerija">
            <label>Галерија слика:</label>
            <RUG action={global.urls.links.dodavanjeSlikeVijesti}
            headers={headers}
              source={response => {
                //setImages(old => [...old, response.naziv]);
                //for (var i in images) {
                setSlikaVeb(old => [...old, { idSlika: count, naziv: response.naziv }]);
                setCount(count + 1);


                //}
                //(response && setImageName(response.naziv));
                //(response && console.log(response.naziv + " response.naziv"));
                //(response && setImageNameF(response.naziv));
                // (response && copyImageNames());
                //(response && console.log(imageName + " imageName"));
                //(response && console.log(images + " images"));
                //(response && console.log(slikaVeb + " slikaVeb"));

                return response.naziv;
              }}
            //setImageName={response.naziv}

            //initialState={imagesData}

            /> {
              //{images && setImageNameF(imageName)}
              //{images && copyImageNames()}
            }
          </div>

          {/*{!isPending && <button value={new Date().toJSON().slice(0, 19)} onClick={(e) => setDatumKreiranja(e.target.value)}>Додај вијест</button>}*/}
          {!isPending && <button value={datumKreiranja} onClick={handleSubmit}>Додај вијест</button>}
          {isPending && <button disabled>Додај вијест</button>}
          {/*</form>*/}
        </div>
        {/*} <div className="dodavanjeVijestiMobileApp">
          <form onSubmit={handleSubmit}>
            <label>
              <input type="text"
                placeholder="Наслов вијести"
                value={naslov}
              ></input>
            </label>
            <textarea
              placeholder="Увод"
              required
              value={uvod}
            ></textarea>
            <textarea
              placeholder="Садржај вијести"
              required
              value={tekst1}
            ></textarea>
            <textarea
              placeholder="Садржај вијести"
              required
              value={tekst2}
            ></textarea>
          </form>
              </div>*/}
      </ReactSplitPane >
    </div >
  );
}

export default DodavanjeVijesti;