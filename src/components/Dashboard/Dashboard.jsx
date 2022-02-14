import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Imagen from '../../img/loading.gif'
import FormularioEnvio from '../FormularioEnvio/FormularioEnvio';
import ListaEnvios from '../ListaEnvios/ListaEnvios';


const Dashboard = () => {
  console.log(`Se renderiza la dashboard`)
  //const usuarioLogeado = useSelector((state) => state.reducerIngresoRegistro); //Obtenemos el usuario desde el reducer
  let usuarioLogeado = JSON.parse(sessionStorage.getItem('usuario'));

  const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();

  const dispatch = useDispatch();

  // // let usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
  // // let apiKey = usuarioLogueado.apiKey;

  //TODO faltan los envios del usuario

  //#region Llamadas a API
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
                 .then((response) => response.json())
                 .then((result) => result)
                 .catch((error) => console.log('error', error));
    // console.log(`Lo que tiene la variable res:`, res);
    // return res;
  };


  // const cargarCiudadesAPI = async (idDpto) => {
  //   let myHeaders = new Headers();
  //   myHeaders.append("apikey", usuarioLogeado.apiKey);
  //   myHeaders.append("Content-Type", "application/json");
  //   let requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };
  //   return await fetch(`https://envios.develotion.com/ciudades.php?idDepartamento=${idDpto}`, requestOptions)
  //                .then(response => response.text())
  //                .then(result => result)
  //                .catch(error => console.log('error', error));
  // };

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
                 .then(response => response.json())
                 .then(result => result)
                 .catch(error => console.log('error', error));
  };

  // const obtenerEnviosAPI = async (idUsuario) => {
  //   let myHeaders = new Headers();
  //   myHeaders.append("apikey", usuarioLogeado.apiKey);
  //   myHeaders.append("Content-Type", "application/json");
  //   let requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };
  //   return await fetch(`https://envios.develotion.com/envios.php?idUsuario=${idUsuario}`, requestOptions)
  //                .then(response => response.text())
  //                .then(result => result)
  //                .catch(error => console.log('error', error));
  // };

  //#endregion




  const cargarAlDispatch = async () => {
    console.log(`Se ejecuta el dispatch`)
    let categorias = await obtenerCategoriasAPI();
    let departamentos = await cargarDptosAPI();
    // console.log(`Los departamentos son:`, departamentos.departamentos);
    // console.log(`Las categorias son:`, categorias.categorias);
    // let envios =  obtenerEnviosAPI(1);
    // let ciudades =  cargarCiudadesAPI(1);
    // let enviosParse = JSON.parse(envios);
    // let categoriasParse = JSON.parse(categorias).categorias;
    // let departamentosParse =  JSON.parse(departamentos)[0].departamentos;
    // let ciudadesParse = JSON.parse(ciudades);


    // console.log(`Los departamenos parseados son: ${departamentosParse}`)
    // console.log(categorias)
    // console.log(categorias)
    // console.log(departamentosParse)
    //console.log(departamentos)
    // // dispatch({type: 'CargarEnvios', payload: enviosParse});
    dispatch( {type: 'CargarCategorias', payload: categorias} );
    dispatch( {type: 'CargarDepartamentos', payload: departamentos} );
  }

    useEffect(() => {
       const datosCargados = async() =>{ 
          await cargarAlDispatch(); 
          setBanderaLlamadasAPI(true);
        }
        datosCargados();
    }, []);

    // useEffect(() => {
    //   //fetch the data --> Works well
    //   async function datosCargados() {
    //     const data = await cargarAlDispatch();
    //   // Add the Data to the Spicearray --> Works  
    //   setBanderaDeptos(true)
    //   }
    // }, [banderaDeptos]);

  //#region Renderizado
  return (
      <>
          <div id="user-info">
              <p>Usuario:</p>
              <p>{usuarioLogeado.nombre}</p>
          </div>
          <div id="log-out">
              <a href="/Login">Logout</a>
          </div>
          { banderaLlamadasAPI ? <FormularioEnvio /> :  <div id="cargando"><p>Cargando...</p> <img src={Imagen} alt="imagen de carga" /></div>  }
          { banderaLlamadasAPI ? <ListaEnvios /> :  ""} 


      </>
  )
  //#endregion
}

export default Dashboard