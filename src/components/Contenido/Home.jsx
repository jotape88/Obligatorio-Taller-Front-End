import React from 'react'
import Imagen from '../../img/fondoHome.jpg'
import { NavLink } from 'react-router-dom'
import { useNavigate, Link } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import { Form, Button, Alert, Navbar } from 'react-bootstrap';

const Home = () => {
    return (
        <section className='row justify-content-center mt-5 mb-5' id="sectionHome">
            <figure className='imagenHome'>
                <figcaption><h2 className='mb-5'>Por favor elija una opción en el menu superior</h2></figcaption>
                <img className='img-fluid' src={Imagen} alt="imagen de una cadena de una warehouse con trabajadores" title='Foto de un warehouse'/>
            </figure>
            
        </section>
    )
}

export default Home