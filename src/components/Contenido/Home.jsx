import React from 'react'
import Imagen from '../../img/fondoHome.jpg'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
        <section className='row justify-content-center mt-5 mb-5' id="sectionHome">
           
            <figure className='imagenHome'>
                <img className='img-fluid' src={Imagen} alt="imagen de una cadena de una warehouse con trabajadores" title='Foto de un warehouse'/>
            </figure>
            <h2 className='mt-5'>Bienvenido, si aún no se autenticó, por favor diríjase al <NavLink className='loginTxt' to="/Login">login</NavLink> para poder utilizar el sistema</h2>
        </section>
  )
}

export default Home