import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Imagen from '../../img/loading.gif'
import FormularioEnvio from '../FormularioEnvio/FormularioEnvio';
import ListaEnvios from '../ListaEnvios/ListaEnvios';
import GastoTotal from '../GastoTotal/GastoTotal';


const Dashboard = () => {
  //#region Variables
  console.log(`Se renderiza el componente Dashboard`)
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuario'));
  const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();
  const dispatch = useDispatch();
  //endregion

  //#region Hooks
  const cargarAlDispatch = async () => {
    let categorias = await obtenerCategoriasAPI();
    let departamentos = await cargarDptosAPI();
    let envios = await cargarEnviosAPI();
    let ciudades = await obtenerCiudadesAPI();

    dispatch( {type: 'CargarCategorias', payload: categorias} );
    dispatch( {type: 'CargarDepartamentos', payload: departamentos} );
    dispatch( {type: 'CargarEnvio', payload: envios} );
    dispatch( {type: 'CargarCiudades', payload: ciudades} );
  }
  
  useEffect(() => {
    const datosCargados = async() =>{ 
      await cargarAlDispatch(); 
      setBanderaLlamadasAPI(true);
    }
    datosCargados();
  }, []);
  //#endregion

  //#region Llamadas a la API
  const cargarDptosAPI = async () => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", usuarioLogeado.apiKey);
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    return await fetch("https://envios.develotion.com/departamentos.php", requestOptions)
                .then((response) => {
                  return new Promise((resolve, reject) => {
                    if (response.status == 200) {
                      return resolve(response.json());
                    } else {
                      return reject("Error");
                    }
                  });
                })            
  };

  const obtenerCategoriasAPI = async () => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", usuarioLogeado.apiKey);
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    return await fetch("https://envios.develotion.com/categorias.php", requestOptions)
                 .then((response) => {
                   return new Promise((resolve, reject) => {
                     if (response.status == 200) {
                       return resolve(response.json());
                     } else {
                       return reject("Error");
                     }
                   });
                 })
   
  };

  const cargarEnviosAPI = async () => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", usuarioLogeado.apiKey);
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    return await fetch(`https://envios.develotion.com/envios.php?idUsuario=${usuarioLogeado.idUsuario}`, requestOptions)
                 .then((response) => {
                   return new Promise((resolve, reject) => {
                     if (response.status == 200) {
                       return resolve(response.json());
                     } else {
                       return reject("Error");
                     }
                   });
                 })
   
    };

  const obtenerCiudadesAPI = async (id) => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", usuarioLogeado.apiKey);
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    return await fetch(`https://envios.develotion.com/ciudades.php`, requestOptions)
                 .then((response) => {
                   return new Promise((resolve, reject) => {
                     if (response.status == 200) {
                       return resolve(response.json());
                     } else {
                       return reject("Error");
                     }
                   });
                 })

  };
  //endregion

  //#region Renderizado
  return (
      console.log(`Se renderiza el return del Dashboard`),
      <section>
          <div id="user-info">
              <p>Usuario:</p>
              <p>{usuarioLogeado.nombre}</p>
          </div>
          <div id="log-out">
              <a href="/Login">Logout</a>
          </div>
          { banderaLlamadasAPI ? <FormularioEnvio /> :  <div id="cargando"><p>Cargando...</p> <img src={Imagen} alt="imagen de carga" /></div>  }
          { banderaLlamadasAPI ? <ListaEnvios /> :  ""} 
          { banderaLlamadasAPI ? <GastoTotal /> :  ""}     
      </section>
  )
  //#endregion
}

export default Dashboard