import { Form, Button, Alert, Card, Table } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDistance from 'geolib/es/getDistance'; //Libreria para calcular la distancia entre dos puntos
import Imagen from '../../img/loading.gif'

const ListaEnvios = () => {
    //#region Variables y Hooks
    console.log("Se renderiza el Componente GastoTotal");
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const [mensajes, setMensajes] = useState('');
    const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();
    const reduceEnvios = useSelector((state) => state.reducerEnvios[0]);
    const reduceCiudades = useSelector((state) => state.reducerCiudades.ciudades);
    const dispatch = useDispatch();
    let costoTotal = 0
    //#endregion

    //#region Metodos
    const calcularTotalDeEnvios = () => {
        reduceEnvios.envios.forEach(envio => {
            costoTotal += envio.precio;
        });

    }
    calcularTotalDeEnvios();
    //#endregion

    //#region Renderizado#
    return (
        <section className='row justify-content-center'>
            <h2 className='col-12 mt-5 mb-4'>Gasto total de envíos</h2>
                <Card className="card pb-4 w-50 rounded">
                    <Card.Body className='my-4'>
                        <Card.Title>Usuario: {usuarioLogueado.nombre}</Card.Title>
                        <Card.Text >$ {costoTotal}</Card.Text>
                    </Card.Body>
                </Card>
        </section>
    )
    //#endregion
}

export default ListaEnvios