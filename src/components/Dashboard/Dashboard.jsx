import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
// import Home from '../Contenido/Home';
import ImagenCarga from '../../img/loading.gif'
import ImagenTrabajadores from '../../img/fondoHome.jpg'
import GastoTotal from '../GastoTotal/GastoTotal';

import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';



const Dashboard = () => {
  //#region Variables
  console.log(`Se renderiza el componente Dashboard`)
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuario'));
  const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //#endregion

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
    try {
      const datosCargados = async() =>{ 
        await cargarAlDispatch(); 
        setBanderaLlamadasAPI(true);
      }
      datosCargados();
    }
    catch (error) {
      alert("Hubo un error en la carga de datos");
    }

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
  //#endregion

  //#region Renderizado

  if(usuarioLogeado == null){
    return <Navigate replace to={"/login"} />
  } else {
        if(banderaLlamadasAPI === true){
          return (
                  <div className='row justify-content-center'>
                    <Navbar>
                    <Container className="justify-content-center">
                        <Nav className="">
                            <NavLink className='navLinks mx-3' to="/">Inicio</NavLink>
                            <NavLink className='navLinks mx-3' to="/formularioEnvio/formularioEnvio">Agregar Envio</NavLink>
                            <NavLink className='navLinks mx-3' to="/listaEnvios/listaEnvios">Listar envíos</NavLink>
                            <NavLink className='navLinks mx-3' to="/listaTopDptos/listaTopDptos">Top 5 Departamentos</NavLink>
                            {/* <NavLink className='navLinks mx-3' to="/xxx/xxx">Graficar envíos por ciudad</NavLink>
                            <NavLink className='navLinks mx-3' to="/xxx/xxx">Graficar envíos por categoría</NavLink> */}
                        </Nav>
                    </Container>
                    </Navbar>
                    <div id="user-info">
                      <p>Usuario</p>
                      <p>{usuarioLogeado.nombre}</p>
                    </div>
                    <GastoTotal></GastoTotal>
                    <div id="log-out">
                      <a href="/Login">Logout</a>
                    </div>    
                    <figure className='imagenHome'>
                      <figcaption><h2 className='mb-5'>Por favor elija una opción en el menu superior</h2></figcaption>
                      <img className='img-fluid' src={ImagenTrabajadores} alt="imagen de una cadena de una warehouse con trabajadores" title='Foto de un warehouse'/>
                    </figure>
                    <Outlet></Outlet>
                  </div>
            );
    } else {  
      return (
        <div id="cargando"><p>Cargando...</p> <img src={ImagenCarga} alt="imagen de carga" /></div> 
      )
    }
  }

    // return (
    //   console.log(`Se renderiza el return del Dashboard`),
    //   <section>

    //     {/* { banderaLlamadasAPI ? <Home /> :   }
    // //  */}

    //       {/* { banderaLlamadasAPI ? <ListaEnvios /> :  ""} 
    //       { banderaLlamadasAPI ? <GastoTotal /> :  ""}  
    //       { banderaLlamadasAPI ? <ListaTopDptos /> :  ""}  */}
                    
    //   </section>
    // ) 
}

//#endregion

export default Dashboard