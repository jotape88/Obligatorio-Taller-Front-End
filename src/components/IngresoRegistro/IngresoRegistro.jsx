import React, { useRef, useState } from 'react'
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate  } from 'react-router-dom';
// import {NavLink} from 'react-router-dom';

const IngresoRegistro = () => {
    //#region Variables y hooks
    console.log("Se renderiza el componente IngresoRegistro");
    sessionStorage.clear(); //Limpiamos los datos de sesion cada vez que redirigimos al login (por ej, cuando hacemos logout desde el boton del header)
    const refInputUsuario = useRef();
    const refInputContrasenia = useRef();
    const [mensajes, setMensajes] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //#endregion

    //#region validaciones
    const validarDatos = (nom, pass) =>{
        return nom.length !== 0 || pass.length !== 0;            
    }
    //#endregion

    //#region llamadas a la API
    const llamadaAPIParaLogin = (usuario, laContrasenia, tipoLlamado) => {
        const laUrl = `https://envios.develotion.com/${tipoLlamado}`;  
        const objeto = {
            usuario: usuario,
            password: laContrasenia
        };
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const cuerpoPost = JSON.stringify(objeto); 
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: cuerpoPost,
            redirect: 'follow'
        };      
        return fetch(`${laUrl}`, requestOptions)
                .then((response) => {
                    return new Promise((resolve, reject) => {
                      if (response.status == 200) {
                        return resolve(response.json());
                      } else {
                        return reject("Error");
                      }
                    });
                  })            

    }
    //#endregion

    //#region handlers
    const handlerIngreso = async (e) => { //Como tenemos que esperar a que el servidor nos responda, es una funcion asincrona
        e.preventDefault(); //Para evitar que no se recargue la pagina
        const elUsuario = refInputUsuario.current.value;
        const laContrasenia = refInputContrasenia.current.value;
        if (validarDatos(elUsuario, laContrasenia)){
            const res = await llamadaAPIParaLogin(elUsuario, laContrasenia, 'login.php');
             if (res.codigo === 200){
                const persona = {
                    idUsuario: res.id,
                    nombre: elUsuario,
                    apiKey: res.apiKey
                } 
                sessionStorage.setItem('usuario', JSON.stringify(persona)); //Guardamos el usuario en el localStorage en version JSON stringify
                dispatch({ type: 'Ingreso', payload: persona }); //Guardamos el usuario en el store
                navigate('/'); //Si todo esta ok, redirigimos al dashboard
             } else{
                setMensajes(res.mensaje); //Si no, mostramos el mensaje de error
             }       
        } else {
            setMensajes('Debe ingresar un usuario y una contraseña.');
        }
    }

    const handlerRegistro = async (e) => {
        e.preventDefault();
        const elUsuario = refInputUsuario.current.value;
        const laContrasenia = refInputContrasenia.current.value;
        if (validarDatos(elUsuario, laContrasenia)){
            const res = await llamadaAPIParaLogin(elUsuario, laContrasenia, 'usuarios.php');     
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
    console.log("Se renderiza el return de IngresoRegistro");

    return (
        <section id="sectionFormularioRegistro" className='row justify-content-center'>
           <Form className='col-10 col-md-6 col-lg-4 col-xl-4 mt-5'>

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

export default IngresoRegistro;