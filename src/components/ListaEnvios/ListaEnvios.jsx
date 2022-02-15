import { Form, Button, Alert, Card, Table } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDistance from 'geolib/es/getDistance'; //Libreria para calcular la distancia entre dos puntos
import Imagen from '../../img/loading.gif'

const ListaEnvios = () => {
    console.log("Se renderiza el Componente listEnvios");
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const [mensajes, setMensajes] = useState('');
    const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();
    const dispatch = useDispatch();
    const reduceEnvios = useSelector((state) => state.reducerEnvios[0]);
    const reduceCiudades = useSelector((state) => state.reducerCiudades.ciudades);
    console.log(`Las ciudades son REDUCER: `, reduceCiudades);
    console.log(`Los envios del REDUCER: `, reduceEnvios);

    const obtenerNombreDeCiudadXId = (idCiudad) => {
        console.log(`Se renderiza el obtenerNombredeCiudad con el id ${idCiudad}`);
        let nombreCiudad = reduceCiudades.find(ciudad => ciudad.id == idCiudad);
        console.log(`El nombre de ciudad es: ` + nombreCiudad.nombre);
        return nombreCiudad.nombre;
    }

     useEffect(() => {
        
     }, [banderaLlamadasAPI]);

    // console.log(`Los envios del reducer son: ${reduceEnvios.envios}`);

    // const traerCiudadXIDDdesdeAPI = (id) => {
    //     var myHeaders = new Headers();

    //     myHeaders.append("apikey", usuarioLogueado.apiKey);
    //     myHeaders.append("Content-Type", "application/json");

    //     var requestOptions = {
    //       method: 'GET',
    //       headers: myHeaders,
    //       redirect: 'follow'
    //     };

    //     const ciudades = fetch(`https://envios.develotion.com/ciudades.php`, requestOptions)
                        
    //                     .then((response) => {
    //                         if (response.codigo !== 200) { 
    //                             setMensajes(`Error: ${response.mensaje}`);
    //                         } else {
    //                             const ciudad = response.ciudades.find(ciudad => ciudad.id == id);
    //                             return ciudad;
    //                         }
    //                     }).catch(error => console.log('error', error));

    // }

     const eliminarEnvio = async (idEnvio) => { 
        var myHeaders = new Headers();
        myHeaders.append("apikey", usuarioLogueado.apiKey);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "idEnvio": idEnvio
        });
        
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
       return await fetch("https://envios.develotion.com/envios.php", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

    const handlerEliminarEnviopXId = async (e, id) => {
        console.log(`Lo que recibe el handlerEliminarEnvioXID es: ${id} y el evento es: ${e}`);
        e.preventDefault();
        await eliminarEnvio(id);
        dispatch({ type: 'EliminarEnvio', payload: id });
        setBanderaLlamadasAPI(true);
    }

    // const traerEnviosAPI = async () => {
    //     // e.preventDefault();
    //     const myHeaders = new Headers();

    //     myHeaders.append("apikey", usuarioLogueado.apiKey);
    //     myHeaders.append("Content-Type", "application/json");

    //     const requestOptions = {
    //       method: 'GET',
    //       headers: myHeaders,
    //       redirect: 'follow'
    //     };

    //     return await fetch(`https://envios.develotion.com/envios.php?idUsuario=${usuarioLogueado.idUsuario}`, requestOptions)
    //                  .then(response => response.json())
    //                  .then((result) => {
    //                     if (result.codigo !== 200) { //Si el codigo es diferente a 200, es porque hubo un error en la llamada, y lo mostramos en pantalla
    //                         setMensajes(`Error: ${result.mensaje}`);
    //                     } else {
    //                         dispatch( {type: 'Envios', payload: result} );

    //                     }
    //                 }).catch(error => console.log('error', error));
    // }

    
//   const cargarAlDispatch = async () => {
//     console.log(`Se ejecuta el dispatch`)
//     let losEnvios = await traerEnviosAPI();
//     console.log(`Los envios son: ${losEnvios}`);

//     dispatch( {type: 'Envios', payload: traerEnviosAPI} );
//   }





    return (
        console.log(`Se renderiza el return ListaEnvios`),
        <div className='row justify-content-center'>
            <h2 className='col-6 mt-5'>Lista de envíos</h2>

                <Table className='col-6 striped bordered hover mt-3 w-75'>
                  <thead>
                    <tr>
                      <th>Ciudad origen</th>
                      <th>Ciudad destino</th>
                      <th>Distancia</th>
                      <th>Costo total</th>
                      <th>Eliminar envío</th>
                    </tr>
                  </thead>
                  <tbody>
                {reduceEnvios.envios.map((e) => (
                    <tr key={e.id}>
                      <td>{obtenerNombreDeCiudadXId(e.ciudad_origen)}</td>
                      <td>{obtenerNombreDeCiudadXId(e.ciudad_destino)}</td>
                      <td>{e.distancia} Kms</td>
                      <td>$ {e.precio}</td>
                      <td><Button onClick={(en) => handlerEliminarEnviopXId(en, e.id) } variant="danger">Eliminar</Button></td>
                    </tr>
                ))}
                  </tbody>
                </Table>       

        </div>
    )
}

export default ListaEnvios