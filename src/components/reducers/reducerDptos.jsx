import React from 'react'

const estadoInicial = '';

const reducerDptos = (state = estadoInicial, action) => {
    // console.log(`Lo que viene del payload`, action.payload)
    switch (action.type) {
        case 'CargarDepartamentos':
            const estadoADevolver = [...state, action.payload];
            return estadoADevolver;
        default:
            return state;
    }

};

export default reducerDptos;