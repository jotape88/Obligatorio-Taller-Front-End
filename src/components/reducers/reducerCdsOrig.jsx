import React from 'react'

const estadoInicial = "";

const reducerCdsOrig = (state = estadoInicial, action) => {
    //  console.log(`Lo que viene del payload ciudades origen`, action.payload)
    switch (action.type) {
        case 'CargarCiudadesOrigen':
                return action.payload;
        default:
            return state;
    }
};

export default reducerCdsOrig;