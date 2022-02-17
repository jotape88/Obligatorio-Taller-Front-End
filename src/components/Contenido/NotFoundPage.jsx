import React from 'react'
import { NavLink } from 'react-router-dom'
import Imagen from '../../img/errorSistema.jpg'


const NotFoundPage = () => {
  return (
        <section className='row justify-content-center'>
           
            <h2 className='mt-4 mb-4'>Error 404, no se encontró la página</h2>
            <h3 className='mb-3'>Ir al <NavLink className='loginTxt' to="/Login">login</NavLink></h3>
            <figure className='imagenHome'>
                <img className='img-fluid' src={Imagen} alt="imagen de una cadena de una warehouse con trabajadores" title='Foto de un warehouse'/>
            </figure>
            
        </section>
  )
}

export default NotFoundPage