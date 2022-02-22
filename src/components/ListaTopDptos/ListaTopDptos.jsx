import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from "react-redux";

const ListaTopDptos = () => {
    //#region Variables y Hooks
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    const reducerCiudades = useSelector((state) => state.reducerCiudades);
    const reducerDepartamentos = useSelector((state) => state.reducerDptos);

    //Metodo para obtener el nombre del departamento a traves del id del mismo
    const obtenerNombreDepartamento = (id) => {
        let nombreDepartamento = '';
        reducerDepartamentos.find(departamento => {
            if (departamento.id === id) {
                nombreDepartamento = departamento.nombre;
            }
        })
        return nombreDepartamento;
    }

    //Recorremos reduceEnvios y comparamos ciudad_destino con el id de la ciudad en el reducer de ciudades
    //Guardamos en un array los departamentos que aparecen en ambas listas junto con la cantidad de veces que se repite
    const topDptos = () => {
        let topDpto = [];
        reduceEnvios.find(e => { 
            reducerCiudades.find(c => {
                if (e.ciudad_destino === c.id) {
                    let nombreDepartamento = obtenerNombreDepartamento(c.id_departamento); //Obtenemos el nombre del departamento
                    let existe = false;
                    topDpto.find(d => {
                        if (d.departamento === nombreDepartamento) { //Matcheamos usando los nombres de los departamentos
                            existe = true;
                            d.cantidad++; //Si existe, aumentamos la cantidad y seteamos la bandera en true
                        }    
                    });
                    if (!existe) { //Si no existe agregamos el departamento al array (solo el nombre y la cantidad en 1, no necesitamos mas datos a afecto de este metodo)
                        topDpto.push({
                            departamento: nombreDepartamento,
                            cantidad: 1
                        });
                    }
                }
            });
            topDpto.sort((a, b) => b.cantidad - a.cantidad);
        });
        return topDpto;
    }
    
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
              {topDptos().slice(0, 5).map((e, index) => (
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