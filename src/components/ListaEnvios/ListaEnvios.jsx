import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

const ListaEnvios = () => {
    //#region Variables y Hooks
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    const reduceCiudades = useSelector((state) => state.reducerCiudades);
    const dispatch = useDispatch();

    //#region Metodos
    const obtenerNombreDeCiudadXId = (idCiudad) => {
      return reduceCiudades.find(ciudad => ciudad.id == idCiudad).nombre; //Se busca la ciudad en el array de ciudades del reduce y se devuelve el nombre de la ciudad
    }
    //#endregion

    //#region llamadas a la API
    const eliminarEnvioAPI = async (idEnvio) => { 
      const myHeaders = new Headers();
      myHeaders.append("apikey", usuarioLogueado.apiKey);
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        "idEnvio": idEnvio
      });   
      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }; 
      return await fetch("https://envios.develotion.com/envios.php", requestOptions)
                   .then((response) => {
                    return new Promise((resolve, reject) => {
                      if (response.status == 200) {
                        return resolve(response.json());
                      } else {
                        return reject("Error");
                      }
                    });
      });           
    };
    //#endregion

    //#region handlers
    const handlerEliminarEnviopXId = async (e, id) => { //Function para eliminar el envio, que recibe los parametros del boton input que se le muestra al usuario
      e.preventDefault(); 
      await eliminarEnvioAPI(id); //Llamada a la API para eliminar el envio, hacemos el await para que espere a que se resuelva la promesa
      dispatch({ type: 'EliminarEnvio', payload: id }); //Hacemos el dispatch y llamamos al reducer para eliminar el envio
    }
    //#endregion

    //#region Renderizado
    return (
        <section className='row justify-content-center'>

          <h2 className='col-6 mt-5'>Lista de envíos</h2>
              <Table className='col-6 table table-hover mt-3 w-75'>
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
              {reduceEnvios.map((e) => (
                  <tr key={e.id}> {/* la key en este caso es el id del envio */}
                    <td>{obtenerNombreDeCiudadXId(e.ciudad_origen)}</td> {/* Le pasamos el codigo de ciudad, y se obtiene el nombre de la ciudad origen del envio */}
                    <td>{obtenerNombreDeCiudadXId(e.ciudad_destino)}</td> {/* Le pasamos el codigo de ciudad, y se obtiene el nombre de la ciudad destino del envio */}
                    <td>{e.distancia} Kms</td>
                    <td>$ {e.precio}</td>
                    <td><Button onClick={(en) => handlerEliminarEnviopXId(en, e.id) } variant="danger">Eliminar</Button></td> {/* Le pasamos al handler el event y el id del envio, el cual se encarga de llamar a la api para borrar */}
                  </tr>
              ))};
                </tbody>
              </Table>       

        </section>
    )
    //#endregion
}

export default ListaEnvios