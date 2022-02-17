import React from 'react'

const estadoInicial = [];

const reducerEnvios = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'CargarEnvio':
            return [...state, action.payload];
            // return estadoADevolver;
        case 'EliminarEnvio':
            let estado = state.filter(envio => envio.id !== action.payload);
            return estado
        default:
            return state;
    }

};

export default reducerEnvios;