import { Form, Button, Alert, Card, Table } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDistance from 'geolib/es/getDistance'; //Libreria para calcular la distancia entre dos puntos
import Imagen from '../../img/loading.gif'

const ListaEnvios = () => {
    console.log("Se renderiza el Componente GastoTotal");
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const [mensajes, setMensajes] = useState('');
    const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();
    const dispatch = useDispatch();
    const reduceEnvios = useSelector((state) => state.reducerEnvios[0]);
    const reduceCiudades = useSelector((state) => state.reducerCiudades.ciudades);
    let costoTotal = 0

    const calcularTotalDeEnvios = () => {
        console.log(`Se renderiza el calcularTotalDeEnvios`);
        reduceEnvios.envios.forEach(envio => {
            costoTotal += envio.precio;
        });

    }
    calcularTotalDeEnvios();

    return (
        // console.log(`Se renderiza el return ListaEnvios`),
        <section className='row justify-content-center'>
            <h2 className='col-12 mt-5 mb-4'>Gasto total de envíos</h2>

                <Card className="card pb-4 w-50 rounded">
                    <Card.Body className='my-4'>
                        <Card.Title>Usuario: {usuarioLogueado.nombre}</Card.Title>
                        <Card.Text >$ {costoTotal}</Card.Text>
                    </Card.Body>
                </Card>


               {/* <h4 className="mb-5">Usuario: {usuarioLogueado.nombre}</h4>
               <h4 className="pb-5">$ {costoTotal}</h4> */}
        </section>
    )
}

export default ListaEnvios