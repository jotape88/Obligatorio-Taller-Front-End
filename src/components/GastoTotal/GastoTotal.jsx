import { Form, Button, Alert, Card, Table } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDistance from 'geolib/es/getDistance'; //Libreria para calcular la distancia entre dos puntos
import Imagen from '../../img/loading.gif'

const ListaEnvios = () => {
    //#region Variables y Hooks
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const [mensajes, setMensajes] = useState('');
    const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    const reduceCiudades = useSelector((state) => state.reducerCiudades.ciudades);
    const dispatch = useDispatch();
    let costoTotal = 0
    //#endregion

    //#region Metodos
    const calcularTotalDeEnvios = () => {
        reduceEnvios.forEach(envio => {
            costoTotal += envio.precio;
        });

    }
    calcularTotalDeEnvios();
    //#endregion

    //#region Renderizado
    return (
        <div id="gastoTotal" className='justify-content-end text-end'>
            <h5>Total gastado</h5>
            <span>$ {costoTotal}</span>
        </div>
    )
    //#endregion
}

export default ListaEnvios