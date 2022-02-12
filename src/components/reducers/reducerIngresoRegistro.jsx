import React from 'react'

const estadoInicial = {
    idUsuario: '',
    apiKey: '',
};

const reducerIngresoRegistro = (state = estadoInicial, action) => {
    
    switch(action.type){
        case 'Ingreso':
            const estadoADevolver = {...state, apikey: action.payload};
            return estadoADevolver;   
        default:
            return state;    
    }
};


export default reducerIngresoRegistro