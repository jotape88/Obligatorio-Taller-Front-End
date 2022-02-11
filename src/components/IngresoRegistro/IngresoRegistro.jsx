import React, { useRef, useState } from 'react'

const IngresoRegistro = () => {

    const refInputUsuario = useRef();
    const refInputContrasenia = useRef();

    const handlerIngreso = async () => { //Como debemos esperar a que el servidor nos responda, es una funcion asincrona
        const elUsuario = refInputUsuario.current.value;
        const laContrasenia = refInputContrasenia.current.value;
      
        const validarDatos = (nom, pass) =>{
            return nom.length !== 0 || pass.length !== 0;
        }

        if (validarDatos(elUsuario, laContrasenia)){
            console.log('Login correcto');
        } else {
            console.log('Los valores no pueden estar en blanco')
        }
    
        //#region [llamado a la API]
        // Dividimos el llamado a la api en varios componentes
        let laUrl = "https://envios.develotion.com/login.php";

        let objeto = {
            usuario: elUsuario,
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
        
        const laRespuesta = await fetch(`${laUrl}`, requestOptions)
                                .then((response) => response.json())
                                .then((result) => console.log(result))
                                .catch((error) => {console.log(error);
                                });
        
        console.log(laRespuesta);

        const elResultado = await laRespuesta.json();     
        
        if(elResultado.apiKey) {
            console.log('Ingreso correcto', elResultado.apiKey);
        } else {
            console.log('Ingreso incorrecto');
        }

        //#endregion 
    }

    const handlerRegistro = async () => {
        return true;
    }


return (
    <div className='formularioRegistro row justify-content-center'>

        <form className='col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-5 text-center pt-5 mt-5 justify-content-center' >
          <input ref={refInputUsuario}    className='py-1 w-100 mb-2 text rounded mb-3' type='text' placeholder='Usuario'  />
          <input ref={refInputContrasenia}   className='py-1 w-100 mb-2 text rounded' type='password' placeholder='Contraseña'  />
          <input onClick={handlerIngreso}    className='rounded me-2 mt-3' type='submit' value='Ingresar' />
          <input onClick={handlerRegistro}    className='rounded ms-2 mt-3' type='submit' value='Registrarse' />
        </form>

    </div>
  )

}


export default IngresoRegistro;