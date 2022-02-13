import React from 'react'
import { useNavigate  } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    sessionStorage.clear();
    navigate('/Login');
}

export default Logout