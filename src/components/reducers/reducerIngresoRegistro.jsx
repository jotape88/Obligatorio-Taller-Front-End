import React from 'react'

const estadoInicial = {   
    idUsuario: JSON.parse(sessionStorage.getItem('usuario')).idUsuario,
    apiKey: JSON.parse(sessionStorage.getItem('usuario')).apiKey,
    nombre: JSON.parse(sessionStorage.getItem('usuario')).nombre
};

const reducerIngresoRegistro = (state = estadoInicial, action) => {
    
    switch(action.type){
        case 'Ingreso':
            // const estadoADevolver = {...state, 
            //     idUsuario: action.payload.idUsuario, 
            //     nombre: action.payload.nombre, 
            //     apiKey: action.payload.apiKey};
            // // console.log(estadoADevolver);
            // return estadoADevolver; 
            return state
        default:
            return state;    
    }
};


export default reducerIngresoRegistro