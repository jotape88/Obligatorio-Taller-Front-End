import React from 'react'

const estadoInicial = '';

const reducerCategs = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'CargarCategorias':
            return [...state, action.payload];
            // return estadoADevolver;
        default:
            return state;
    }
}

export default reducerCategs