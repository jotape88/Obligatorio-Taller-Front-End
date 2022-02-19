import { Form, Button, Alert, Card, Table } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDistance from 'geolib/es/getDistance'; //Libreria para calcular la distancia entre dos puntos
import Imagen from '../../img/loading.gif'

const ListaTopDptos = () => {
    console.log("Se renderiza el Componente listEnvios");
    //#region Variables y Hooks
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const [mensajes, setMensajes] = useState('');
    const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();
    const dispatch = useDispatch();
    const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuario'));

    const reduceEnvios = useSelector((state) => state.reducerEnvios[0]);
    const reducerCdsDes = useSelector((state) => state.reducerCdsDes.ciudades);

    const reduceDptos = useSelector((state) => state.reducerDptos);
    const departamentos = reduceDptos[0].departamentos;

    const dptosTop = [];

    // console.log(`Las ciudades son REDUCER: `, reduceCiudades);
    // console.log(`Los envios del REDUCER: `, reduceEnvios);
    //#endregion

    const cargarEnviosAPI = async () => {
        let myHeaders = new Headers();
        myHeaders.append("apikey", usuarioLogeado.apiKey);
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        return await fetch(`https://envios.develotion.com/envios.php?idUsuario=${usuarioLogeado.idUsuario}`, requestOptions)
                     .then((response) => {
                       return new Promise((resolve, reject) => {
                         if (response.status == 200) {
                           return resolve(response.json());
                         } else {
                           return reject("Error");
                         }
                       });
                     })
       
    };



    //#region Metodos
    // const obtenerNombreDeCiudadXId = (idCiudad) => {
    //   console.log(`Se renderiza el obtenerNombredeCiudad con el id ${idCiudad}`);
    //   const nombreCiudad = reduceCiudades.find(ciudad => ciudad.id == idCiudad);
    //   console.log(`El nombre de ciudad es: ` + nombreCiudad.nombre);
    //   return nombreCiudad.nombre;
    // }
    //#endregion

    //#region Renderizado
    return (
        console.log(`Se renderiza el return ListTopDptos`),
        <section className='row justify-content-center'>

          <h2 className='col-6 mt-5'>Top 5 Departamentos con mas envíos</h2>
              <Table className='col-6 striped bordered hover mt-3 w-75'>
                <thead>
                  <tr>
                    <th>Posición</th>
                    <th>Nombre</th>
                    <th>Total de envíos</th>
                  </tr>
                </thead>
                <tbody>
              {reduceEnvios.envios.map((e) => (
                  <tr key={e.id}>
                    <td>1</td>
                    <td>(e.ciudad_destino)</td>
                    <td>{e.distancia} Kms</td>
                    <td>$ {e.precio}</td>
                    <td><Button onClick={(en) => (en, e.id) } variant="danger">Eliminar</Button></td>
                  </tr>
              ))}
                </tbody>
              </Table>       

        </section>
    )
    //#endregion
}

export default ListaTopDptos