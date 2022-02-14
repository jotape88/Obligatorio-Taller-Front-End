import React from 'react'

const estadoInicial = "";

const reducerCdsDes = (state = estadoInicial, action) => {
    // console.log(`Lo que viene del payload`, action.payload)
    switch (action.type) {
        case 'CargarCiudadesDestino':
                return action.payload;
        default:
            return state;
    }
};

export default reducerCdsDes;