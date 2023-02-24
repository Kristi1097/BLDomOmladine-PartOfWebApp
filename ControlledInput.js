import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import SaleEdit from "./SaleEdit";

const ControlledInput = ({withSala}) => {
    
    // const [id, setId] = useState(sala.id);
    // const [title, setTitle] = useState(sala.naziv);
    // const [body, setBody] = useState(sala.opis);

    // const handleSubmit = (e) =>{
    //     e.preventDefault();
    //     const newSala = { id, title, body};

    //     fetch('http://localhost:8000/sale/'+ newSala.id, {
    //         method: 'PUT',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newSala)
    //     }).then(() => {
    //         console.log('sala izmijenjena');
    //     })
    // }
    // const newSala = withSala || {};
    // const [sala,setSala] = useState(newSala);
    // const navigate = useNavigate();
    // console.log(withSala);

    // const urediSalu = () => {
    //     fetch('http://localhost:8000/sale/'+ sala.id, {
    //         method: 'PUT',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(sala)
    //     })
    //     .then(() => {
    //         navigate('/sale/spisak/sala/'+ sala.id);
    //     });
    // }

    // useEffect(() => {
    //     console.log('useEffect ran');
    // }, [withSala.id]);

    const urediSalu = () => {
        <SaleEdit withSala={withSala}/>
    }

    let i = -1;
    const getInventar = withSala.inventarVeb.map(()=>{
        ++i;
        return (
            <tr key={i}>
              <td>{withSala.inventarVeb[i].naziv}</td>
              <td>{withSala.inventarVeb[i].kolicina}</td>
            </tr>
          );
    });

    return (
      <div className="controlled-input">
        {/* {sala && <img src={slika} alt={sala.nazivSlika} width="400" height="300"></img>} */}
        <form>
          <label>Назив сале:</label>
          <input
            type="text"
            required
            readOnly
            value={withSala.naziv}
            // onChange={(e) => setSala({ ...sala, naziv: e.target.value })}
          />
          <label>Опис сале:</label>
          <textarea
            required
            readOnly
            value={withSala.opis}
            // onChange={(e) => setSala({ ...sala, opis: e.target.value })}
          ></textarea>
          <label>Капацитет сале:</label>
          <textarea required readOnly value={withSala.kapacitet}></textarea>
          <label>Инвентар сале:</label>
          <table className="table table-stripped"
                 style={{ backgroundColor : 'white', border : '1px solid #e89c37', margin : '10px 0px' }}>
            <thead>
              <tr>
                <th>Назив</th>
                <th>Количина</th>
              </tr>
            </thead>
            <tbody>{getInventar}</tbody>
          </table>
          {/* <button onClick={urediSalu}>UrediSalu
                     <Link to={`/sale/spisak/sala/${withSala.id}/edit`}>Uredi salu</Link> 
                </button> */}
        </form>
      </div>
    );
}
 
export default ControlledInput;