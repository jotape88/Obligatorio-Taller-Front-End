import React from 'react'

const estadoInicial = [];

const reducerEnvios = (state = estadoInicial, action) => {
    // console.log(`Lo que viene del payload`, action.payload)
    switch (action.type) {
        case 'CargarEnvio':
            return [...state, action.payload];
            // return estadoADevolver;
        case 'EliminarEnvio':
            return state.filter(envio => envio.id != action.payload.id);
        default:
            return state;
    }

};

export default reducerEnvios;