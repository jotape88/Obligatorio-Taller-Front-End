import React from 'react'

const estadoInicial = "";

const reducerCiudades = (state = estadoInicial, action) => {
    //  console.log(`Lo que viene del payload ciudades origen`, action.payload)
    switch (action.type) {
        case 'CargarCiudades':
                return action.payload;
        default:
            return state;
    }
};

export default reducerCiudades;