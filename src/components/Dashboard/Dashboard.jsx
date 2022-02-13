import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import FormularioEnvio from '../FormularioEnvio/FormularioEnvio';
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  console.log(`Se renderiza la dashboard`)
  const usuarioLogeado = useSelector((state) => state.reducerIngresoRegistro); //Obtenemos el usuario desde el reducer
  const dispatch = useDispatch();

  // // let usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
  // // let apiKey = usuarioLogueado.apiKey;

  //TODO faltan los envios del usuario

  //#region Llamadas a API
  const cargarDptosAPI = () => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", usuarioLogeado.apiKey);
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    return  fetch("https://envios.develotion.com/departamentos.php", requestOptions)
                 .then((response) => response.json())
                 .then((result) => console.log(result.departamentos))
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


  // // const obtenerCategoriasAPI = async () => {
  // //   let myHeaders = new Headers();
  // //   myHeaders.append("apikey", usuarioLogeado.apiKey);
  // //   myHeaders.append("Content-Type", "application/json");

  // //   let requestOptions = {
  // //     method: 'GET',
  // //     headers: myHeaders,
  // //     redirect: 'follow'
  // //   };

  // //   return await fetch("https://envios.develotion.com/categorias.php", requestOptions)
  // //                .then(response => response.text())
  // //                .then(result => result)
  // //                .catch(error => console.log('error', error));
  // // };
  // //#endregion

  const cargarAlDispatch = () => {
    console.log(`Se ejecuta el dispatch`)
    // let envios =  obtenerEnviosAPI(1);
    // let categorias =  obtenerCategoriasAPI();
    let departamentos = cargarDptosAPI();
    // let ciudades =  cargarCiudadesAPI(1);

    // let enviosParse = JSON.parse(envios);
    // let categoriasParse = JSON.parse(categorias).categorias;
    // let departamentosParse =  JSON.parse(departamentos).departamentos;
    // let ciudadesParse = JSON.parse(ciudades);


    console.log(`Los departamenos son: ${departamentos}`)
    // console.log(categorias)
    // console.log(categorias)
    // console.log(departamentosParse)
    //console.log(departamentos)
    // // dispatch({type: 'CargarEnvios', payload: enviosParse});
    // // dispatch({type: 'CargarCategorias', payload: categoriasParse});
    dispatch( {type: 'CargarDepartamentos', payload: departamentos} );
  }

    // useEffect(() => {
      cargarAlDispatch();
      // }, []);



  

  return (

    <div>
        <FormularioEnvio></FormularioEnvio>
    </div>
  )
}

export default Dashboard