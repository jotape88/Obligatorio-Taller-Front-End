import React from 'react'

const estadoInicial = '';

const reducerEnvios = (state = estadoInicial, action) => {
    // console.log(`Lo que viene del payload`, action.payload)
    switch (action.type) {
        case 'Envios':
            return [...state, action.payload];
            // return estadoADevolver;
        default:
            return state;
    }

};

export default reducerEnvios;