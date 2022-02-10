import React from 'react'
import Imagen from '../img/go-up.png'

const Footer = () => {
    return  <>
                <a href="#miHeader">
                        <figure id="anclaVolver">
                            <img alt="flechaVovler" title="Flecha para volver al inicio" src={Imagen}></img>

                        </figure>
                </a>
                <footer className='py-2 ps-5'>
                    <p>2022 - Juan Pablo Gil - Taller Front End</p>
                </footer>
            </> 
}

export default Footer;