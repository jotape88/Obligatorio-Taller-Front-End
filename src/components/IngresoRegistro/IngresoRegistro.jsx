import React, { useRef, useState } from 'react'
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate  } from 'react-router-dom';
// import {NavLink} from 'react-router-dom';

//#region ( Components )
const IngresoRegistro = () => {
    sessionStorage.clear(); //Limpiamos los datos de sesion cada vez que redirigimos al login (cuando hacemos logout desde el header)
    console.log("Se renderiza el componente IngresoRegistro");

    //#region [Hooks]
    const refInputUsuario = useRef();
    const refInputContrasenia = useRef();
    const [mensajes, setMensajes] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //#endregion

    //#region [Metodos, Validaciones]
    const validarDatos = (nom, pass) =>{
        return nom.length !== 0 || pass.length !== 0;            
    }
    //#endregion

    //#region [Llamadas a la API]
    const llamadaAPI = (usuario, laContrasenia, tipoLlamado) => {
        let laUrl = `https://envios.develotion.com/${tipoLlamado}`;  
        // Dividimos el llamado a la api en varios componentes
        let objeto = {
            usuario: usuario,
            password: laContrasenia
        };
        
        let myHeaders = new Headers();
    
        myHeaders.append("Content-Type", "application/json");
        
        let cuerpoPost = JSON.stringify(objeto);
        
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: cuerpoPost,
            redirect: 'follow'
        };
        
        return fetch(`${laUrl}`, requestOptions)
                                .then((response) => response.json())
                                .then((result) => result)
                                .catch((error) => {console.log(error);
                                });
    }
    //#endregion

    //#region [Handlers]
    const handlerIngreso = async (e) => { //Como tenemos que esperar a que el servidor nos responda, es una funcion asincrona
        const elUsuario = refInputUsuario.current.value;
        const laContrasenia = refInputContrasenia.current.value;
     
        e.preventDefault(); //Para evitar que no se recargue la pagina

        if (validarDatos(elUsuario, laContrasenia)){
            // console.log('Login correcto');
            let res = await llamadaAPI(elUsuario, laContrasenia, 'login.php');
            // console.log(res);

             if (res.codigo === 200){
                let persona = {
                    idUsuario: res.id,
                    nombre: elUsuario,
                    apiKey: res.apiKey
                } 
                sessionStorage.setItem('usuario', JSON.stringify(persona)); //Guardamos el usuario en el localStorage en version JSON stringify
                dispatch({ type: 'Ingreso', payload: persona }); //Guardamos el usuario en el store
                navigate('/Dashboard');
             } else{
                setMensajes(res.mensaje);
             }
            
        } else {
            setMensajes('Debe ingresar un usuario y una contraseña.');
        }
    }

    const handlerRegistro = async (e) => {
        const elUsuario = refInputUsuario.current.value;
        const laContrasenia = refInputContrasenia.current.value;

        e.preventDefault();

        if (validarDatos(elUsuario, laContrasenia)){
            let res = await llamadaAPI(elUsuario, laContrasenia, 'usuarios.php');
            // console.log(res);
            //TODO seguir aca
            
            if (res.codigo === 200){
                setMensajes(`El usuario "${elUsuario}" fue registrado correctamente con la id: "${res.id}"`);
             } else{
                setMensajes(res.mensaje);
             }

        } else {
            setMensajes('Debe ingresar un usuario y una contraseña.');
        }

    }
    //#endregion

    //#region [Renderizado]
return (
    console.log("Se renderiza el return de IngresoRegistro"),
     <section className='row formularioRegistro justify-content-center'>

        <Form className='col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 mt-5'>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control required  ref={refInputUsuario} type="text" placeholder="Usuario" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control required  ref={refInputContrasenia} type="password" placeholder="Contraseña" />
          </Form.Group>
     
          <input  onClick={handlerIngreso}   className='rounded me-2 mt-3' type='submit' value='Ingresar' />
          <input  onClick={handlerRegistro}  className='rounded ms-2 mt-3' type='submit' value='Registrarse' />
          
        </Form>

        {mensajes && <div className="row justify-content-center"><Alert className='col-4 mt-5 rounded justify-content-center' variant="warning">{mensajes}</Alert></div>} 

     </section>
  )
  //#endregion
}
//#endregion

export default IngresoRegistro;