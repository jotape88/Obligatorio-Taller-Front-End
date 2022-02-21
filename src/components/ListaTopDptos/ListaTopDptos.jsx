import { Table } from 'react-bootstrap';
import { useSelector } from "react-redux";

const ListaTopDptos = () => {
    //#region Variables y Hooks
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    const reducerCiudades = useSelector((state) => state.reducerCiudades);
    const reducerDepartamentos = useSelector((state) => state.reducerDptos);

    let topDepartamentos = [];

    //Metodo para obtener el nombre del departamento a traves del id del mismo
    const obtenerNombreDepartamento = (id) => {
        let nombreDepartamento = '';
        reducerDepartamentos.forEach(departamento => {
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
    
    //#region Renderizado
    return (
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