import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import {useRef} from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
export function uzmiToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
   }
const DodavanjePokrovitelja = () => {
    let idPokrovitelj = 1;
    const [naziv, setNaziv] = useState('');
    const [slikaVeb, setSlikaVeb] = useState([{ idSlika: 1, naziv: "" }]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isPending, setIsPending] = useState();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        //setIsSelected(true);
    };
    const handleSubmission = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        fetch(
            global.urls.links.dodavanjeSlikePokrovitelja,
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
                let naziv = (result.naziv);
                setSlikaVeb({ idSlika: 1, naziv: naziv });
                if(naziv)
                NotificationManager.success('Фотографија је успјешно додана !', 'Успјешно!', 2000);
                else
                NotificationManager.info('Провјерите да ли сте одабрали фотографију !','Унос',2000);
            })
            .catch((error) => {
                console.error('Error:', error);
                NotificationManager.error('Фотографија није успјешно додана !', 'Грешка!');
            });
    };
    const handleDeleteImage = (event) => {
        setSelectedFile(event.target.value = null);
        fetch(
            global.urls.links.slikePokrovitelja + slikaVeb.naziv,
          {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer '+uzmiToken()
              }),
          }
        )
        .then((result) => {
            NotificationManager.success('Фотографија је обрисана !', 'Обрисано !', 2000);
            inputRef.current.value = null;
        })
        .catch((error) => {
            NotificationManager.error('Фотографија није обрисана! Покушајте поново!', 'Грешка!');
        });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const pokrovitelj = { idPokrovitelj, naziv, slikaVeb };
        fetch(global.urls.links.pokrovitelji, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+uzmiToken()
              }),
            body: JSON.stringify(pokrovitelj)
        }).then(() => {
            console.log('novi pokrovitelj dodan');
            setIsPending(false);
            navigate('/dogadjajiPrikaz/0');
        })
    }

    return (
        <div className="dodavanjePokrovitelja">
            <h2>Додавање новог покровитеља</h2>
            
                <div className="slikaPokrovitelj">
                    <input ref={inputRef} type="file" name="file" onChange={changeHandler} />
                    <button onClick={handleSubmission}>Додај слику</button>
                    <button onClick={handleDeleteImage}>Обриши слику</button>
                </div>
                <NotificationContainer/>
                <input
                    placeholder="Унесите назив покровитеља"
                    type="text"
                    required
                    value={naziv}
                    onChange={(e) => setNaziv(e.target.value)}
                />
                {!isPending && <button onClick={handleSubmit}>Додај покровитеља</button>}
                {isPending && <button disabled>Додај покровитеља</button>}
        </div>
    );
}

export default DodavanjePokrovitelja;