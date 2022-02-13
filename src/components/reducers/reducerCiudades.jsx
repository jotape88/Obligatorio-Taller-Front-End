import React from 'react'

const estadoInicial = "";

const reducerDptos = (state = estadoInicial, action) => {
    // console.log(`Lo que viene del payload`, action.payload)
    switch (action.type) {
        case 'CargarCiudades':
            switch (action.corresponde) {
                case 'ORIGEN':
                    return {Corresp: "ORIGEN", payload: [action.payload]};
                    
                case 'DESTINO':
                    return {Corresp: "DESTINO", payload: [action.payload]};
                    
                    default:
                        return state;
            }

        default:
            return state;
    }
};

export default reducerDptos;