import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

const ListaEnvios = () => {
    //#region Variables y Hooks
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const dispatch = useDispatch();
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    const reduceCiudades = useSelector((state) => state.reducerCiudades);

    //#region Metodos
    const obtenerNombreDeCiudadXId = (idCiudad) => {
      const nombreCiudad = reduceCiudades.find(ciudad => ciudad.id == idCiudad);
      return nombreCiudad.nombre;
    }
    //#endregion

    //#region llamadas a la API
    const eliminarEnvio = async (idEnvio) => { 
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
    const handlerEliminarEnviopXId = async (e, id) => {
      e.preventDefault();
      await eliminarEnvio(id);
      dispatch({ type: 'EliminarEnvio', payload: id });
      // setBanderaLlamadasAPI(true);
    }
    //#endregion

    //#region Renderizado
    return (
        <section className='row justify-content-center'>

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
              {reduceEnvios.map((e) => (
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

        </section>
    )
    //#endregion
}

export default ListaEnvios