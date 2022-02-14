import { Form, Button, Alert, Card, Table } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDistance from 'geolib/es/getDistance'; //Libreria para calcular la distancia entre dos puntos
import Imagen from '../../img/loading.gif'

const ListaEnvios = () => {
    console.log("Se renderiza la lista de envios");
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const [mensajes, setMensajes] = useState('');
    const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();
    const dispatch = useDispatch();
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    console.log(`Los envios del reducer son: ${reduceEnvios}`);

    const traerEnviosAPI = async () => {
        // e.preventDefault();
        const myHeaders = new Headers();

        myHeaders.append("apikey", usuarioLogueado.apiKey);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        return await fetch(`https://envios.develotion.com/envios.php?idUsuario=${usuarioLogueado.idUsuario}`, requestOptions)
                     .then(response => response.json())
                     .then(result => console.log(result))
                     .catch(error => console.log('error', error));
    }


    useEffect(() => {
           const datosCargados = async() =>{ 
              let envios = await traerEnviosAPI(); 
              dispatch( {type: 'Envios', payload: envios} );
              setBanderaLlamadasAPI(true);
            }
            datosCargados();
    }, []);


    return (
        <div className='row justify-content-center'>
            <h2 className='col-6 mt-5'>Lista de envíos</h2>
            {/* {reduceEnvios.map((e) => ( */}
                {/* <Card className="card">
                    <Card.Body key={0}>
                        <Card.Title key={1}></Card.Title>
                        <Card.Text key={2}>Ciudad origen: {"Montevideo"}</Card.Text>
                        <Card.Text key={3}>Ciudad destino: {"Canelones"}</Card.Text>
                        <Card.Text key={4}>Distancia en kms: {15}</Card.Text>
                        <Card.Text key={5}>Costo total: ${1500}</Card.Text>
                    </Card.Body>
                </Card> */}

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
                    <tr>
                      <td>Montevideo</td>
                      <td>Canelones</td>
                      <td>150Kms</td>
                      <td>$1500</td>
                      <td><Button variant="danger">Eliminar</Button></td>
                    </tr>
                  </tbody>
                </Table>


            {/* ))} */}
        

        </div>
    )
}

export default ListaEnvios