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

    const reduceE = useSelector((state) => state.reducerEnvios[0]);
    const reduceEnvios = reduceE.envios;

    const reducerCiudades = useSelector((state) => state.reducerCiudades.ciudades);

    console.log(`Las ciudades del reducerciud son`, reduceEnvios, reducerCiudades)

    const reduceDptos = useSelector((state) => state.reducerDptos);
    const departamentos = reduceDptos[0].departamentos;
    // console.log("los departamentos son", departamentos);

    // const [topDepartamentos, setTopDepartamentos] = useState([]);

    let topDepartamentos = [];

    //Metodo para obtener el nombre del departamento a traves del id del mismo
    const obtenerNombreDepartamento = (id) => {
        let nombreDepartamento = '';
        departamentos.forEach(departamento => {
            if (departamento.id === id) {
                nombreDepartamento = departamento.nombre;
            }
        })
        return nombreDepartamento;
    }

    
    //Recorremos reduceEnvios y comparamos ciudad_destino con el id de la ciudad en el reducer de ciudades
    //Guardamos en un array los departamentos que aparecen en ambas listas junto con la cantidad de veces que se repite
    const topDptos = () => {
        reduceEnvios.forEach(envio => { 
            reducerCiudades.forEach(ciudad => {
                if (envio.ciudad_destino === ciudad.id) {
                    let departamento = obtenerNombreDepartamento(ciudad.id_departamento);
                    let existe = false;
                    topDepartamentos.forEach(dpto => {
                        if (dpto.departamento === departamento) {
                            dpto.cantidad++;
                            existe = true;
                        }
                    });
                    if (!existe) {
                        topDepartamentos.push({
                            departamento: departamento,
                            cantidad: 1
                        });
                    }
                }
            });
        });
    }

    topDptos();

    //Ordenamos de mayor a menor por la cantidad de veces que se repite
    topDepartamentos.sort((a, b) => b.cantidad - a.cantidad);
    
    console.log(topDepartamentos);

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
            
            {/*A efectos practicos, usar un id autogenerado para la key no genera problemas en esta instancia*/}
              {topDepartamentos.slice(0, 5).map((e, index) => (
                  <tr key={index+1}> 
                    <td>{index+1}</td>
                    <td>{e.departamento}</td>
                    <td>{e.cantidad}</td>
                  </tr>
              ))}
                </tbody>
              </Table>       

        </section>
    )
    //#endregion
}

export default ListaTopDptos