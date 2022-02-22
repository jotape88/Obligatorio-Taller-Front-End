import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import ImagenCarga from '../../img/loading.gif'
import GastoTotal from '../GastoTotal/GastoTotal';

const Dashboard = () => {
  //#region Variables
  const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuario'));
  const [banderaLlamadasAPI, setBanderaLlamadasAPI] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //#endregion

  //#region Hooks
  const cargarAlDispatch = async () => {
    try{
      let c = await obtenerCategoriasAPI();
      let categorias = c.categorias; //Nos quedamos con el array de las categorias y descartamos el mensaje que nos devuelve la API (ej, 200)

      let d = await cargarDptosAPI();
      let departamentos = d.departamentos;

      let e = await cargarEnviosAPI();
      let envios = e.envios;
      
      let ci = await obtenerCiudadesAPI();
      let ciudades = ci.ciudades;

      dispatch( {type: 'CargarCategorias', payload: categorias} );
      dispatch( {type: 'CargarDepartamentos', payload: departamentos} );
      dispatch( {type: 'CargarEnvio', payload: envios} );
      dispatch( {type: 'CargarCiudades', payload: ciudades} );
    }
    catch(error){
      console.log(`Advertencia: `, error); 
    }
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
      alert("Hubo un error en la carga de datos"); //Si hay algun error en las llamadas a las API cuando se carga la app por primera vez, se va a mostrar este mensaje
    }
  }, []);

  const handleLogOut = () => {
    sessionStorage.clear();  //Borramos el sessionStorage con los datos del usuario logueado
    navigate('/login'); //Navegamos a la pagina de login
  }
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
    return await fetch(`https://envios.develotion.com/departamentos.php`, requestOptions)
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
    return await fetch(`https://envios.develotion.com/categorias.php`, requestOptions)
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

  const obtenerCiudadesAPI = async () => {
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
  if(usuarioLogeado == null){ //Si no hay usuario logueado, navegamos a la pagina de login
    return <Navigate replace to={"/login"} />
  } else { //Si hay usuario logueado, renderizamos la pagina
        if(banderaLlamadasAPI === true){ //Si ya se cargaron las llamadas a las APIs (es decir, si ya se cargaron los datos en el dispatch) mostramos todo el menu del dashboard
          return (
                  <div id="sectionDashboard" className='row justify-content-center me-auto'>
                    <Navbar>
                      <Container className="justify-content-center">
                          <Nav>
                              <NavLink className='navLinks mx-3 menu' to="/">Inicio</NavLink>
                              <NavLink className='navLinks mx-3 menu' to="/formEnvios/">Agregar Envio</NavLink>
                              <NavLink className='navLinks mx-3 menu' to="/listEnvios/">Listar envíos</NavLink>
                              <NavLink className='navLinks mx-3 menu' to="/topEnvios/">Top 5 Departamentos</NavLink>
                              <NavLink className='navLinks mx-3 menu' to="/grafEnvXCiud/">Envíos por ciudad</NavLink>
                              <NavLink className='navLinks mx-3 menu' to="/grafEnvXCateg/">Envíos por categoría</NavLink>
                          </Nav>
                      </Container>
                    </Navbar>
                    <div id="user-info">
                      <p>Usuario</p>
                      <p>{usuarioLogeado.nombre}</p>
                    </div>
                    <GastoTotal></GastoTotal>
                    <Button onClick={ handleLogOut } id='log-out' >
                      Salir
                    </Button>
                    <Outlet className='me-auto'></Outlet> {/* para poder mostrar a los hijos */}
                  </div>
          );
        }else {   //Mientras no se carguen las llamadas a las APIs, mostramos un gif de cargando
          return (
            <div id="cargando"><p>Cargando...</p> <img src={ImagenCarga} alt="imagen de carga" /></div> 
          )
    }
  }

}

//#endregion

export default Dashboard