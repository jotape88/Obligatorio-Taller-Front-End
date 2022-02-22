import React from 'react'
import Imagen from '../../img/errorSistema.jpg'
import { NavLink } from 'react-router-dom';


const NotFoundPage = () => {
  return (
        <section className='row justify-content-center'>      
            <h2 className='mt-5 mb-5'>Error 404, no se encontró la página</h2>       
            <figure className='imagenHome mt-5'>
                <img className='img-fluid' src={Imagen} alt="imagen de una cadena de una warehouse con trabajadores" title='Foto de un warehouse'/>
            </figure>      
            <h3 className='mb-3'>Volver a <NavLink className='loginText' to="/">Dashboard/Login</NavLink></h3>
        </section>
  )
}

export default NotFoundPage