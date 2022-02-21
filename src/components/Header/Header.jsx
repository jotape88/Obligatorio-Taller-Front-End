import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';


const Header = () => {
    return  <>               
                <header id='miHeader' className='align-items-top text-center'>
                <h1 className="pt-3">¡Bienvenido!</h1>
                <h3 className="pt-2">Sistema de gestión de envíos</h3>
                </header> 
            </>
}

export default Header;