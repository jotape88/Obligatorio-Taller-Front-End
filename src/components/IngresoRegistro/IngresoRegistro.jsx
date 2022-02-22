import React, { useRef, useState } from 'react'
import { Alert, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate  } from 'react-router-dom';
// import {NavLink} from 'react-router-dom';

const IngresoRegistro = () => {
    //#region Variables y hooks
    const refInputUsuario = useRef();
    const refInputContrasenia = useRef();
    const [mensajes, setMensajes] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //#endregion

    //#region validaciones
    const validarDatos = (nom, pass) =>{ //validamos datos ingresados desde el input desde el login
        let bandera = false;
        return bandera = true ? nom != '' && pass != '' : bandera; //si no esta vacio el usuario y contraseña entonces bandera es true
    }
    //#endregion

    //#region llamadas a la API
    const llamadaAPIParaLoginORegistro = (usuario, laContrasenia, tipoLlamado) => {
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
               .then((response) => response.json())
               .then((result) => result)
               .catch((error) => {console.log(error);
        });           

    }
    //#endregion

    //#region handlers
    const handlerIngreso = async (e) => { //handler encargado del login del usuario
      e.preventDefault(); //evitamos que se recargue la pagina
      const elUsuario = refInputUsuario.current.value;
      const laContrasenia = refInputContrasenia.current.value;
      if (validarDatos(elUsuario, laContrasenia)){
          const res = await llamadaAPIParaLoginORegistro(elUsuario, laContrasenia, 'login.php'); //llamamos a la API para pasarle los datos ingresados por el usuario
           if (res.codigo === 200){ //si el codigo es 200 entonces el usuario y contraseña son correctos
              const persona = { //creamos un objeto persona
                  idUsuario: res.id, 
                  nombre: elUsuario, //el nombre del usuario es el mismo que el usuario ingresado
                  apiKey: res.apiKey
              } 
              sessionStorage.setItem('usuario', JSON.stringify(persona)); //Guardamos el usuario en el localStorage en version JSON stringify
              dispatch({ type: 'Ingreso', payload: persona }); //Guardamos el usuario en el store
              navigate('/'); //Si todo esta ok, redirigimos al dashboard
           } else{
              setMensajes(res.mensaje); //Si no, mostramos el mensaje de error correspondiente
           }       
      } else {
          setMensajes('Debe ingresar un usuario y una contraseña.');
      }
    }

    const handlerRegistro = async (e) => { //handler encargado del registro del usuario
        e.preventDefault();
        const elUsuario = refInputUsuario.current.value;
        const laContrasenia = refInputContrasenia.current.value;
        if (validarDatos(elUsuario, laContrasenia)){
            const res = await llamadaAPIParaLoginORegistro(elUsuario, laContrasenia, 'usuarios.php'); //usamos el string 'usuario.php' para indicarle a la API que estamos haciendo un registro
            if (res.codigo === 200){
                setMensajes(`El usuario "${elUsuario}" fue registrado correctamente con la id: "${res.id}"`); //Si todo esta ok, mostramos el mensaje de registro con el usuario e id generada
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

            {/* Segun el estado de la bandera, es que se muestra o no un mensaje con respecto al login/registro */}
            {mensajes && <div className="row justify-content-center"><Alert className='col-4 mt-5 rounded justify-content-center' variant="warning">{mensajes}</Alert></div>} 
        </section>
  )
  //#endregion
}

export default IngresoRegistro;