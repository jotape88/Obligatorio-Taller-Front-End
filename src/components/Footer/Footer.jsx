import Imagen from '../../img/go-up.png'

const Footer = () => {
    return  <footer className='row footer text-start'>
                <a href="#miHeader">
                        <figure id="anclaVolver">
                            <img alt="flechaVovler" title="Flecha para volver al inicio" src={Imagen}></img>

                        </figure>
                </a>
                <p className='pt-1 ps-5'>2022 - Juan Pablo Gil - Taller Front End</p>
            </footer>
            
}

export default Footer;