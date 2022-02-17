import React from 'react'

const estadoInicial = '';

const reducerDptos = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'CargarDepartamentos':
            return [...state, action.payload];
            // return estadoADevolver;
        default:
            return state;
    }

};

export default reducerDptos;