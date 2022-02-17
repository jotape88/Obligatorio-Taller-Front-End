import React from 'react'

const estadoInicial = "";

const reducerCdsOrig = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'CargarCiudadesOrigen':
                return action.payload;
        default:
            return state;
    }
};

export default reducerCdsOrig;