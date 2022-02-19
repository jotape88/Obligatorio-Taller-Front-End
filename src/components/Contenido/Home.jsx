import React from 'react'
import Imagen from '../../img/fondoHome.jpg'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
        <section className='row justify-content-center mt-5 mb-5' id="sectionHome">
           
            <figure className='imagenHome'>
                <img className='img-fluid' src={Imagen} alt="imagen de una cadena de una warehouse con trabajadores" title='Foto de un warehouse'/>
            </figure>
            <h2 className='mt-5'>Bienvenido, por favor elija una opción en el menu superior</h2>
        </section>
  )
}

export default Home