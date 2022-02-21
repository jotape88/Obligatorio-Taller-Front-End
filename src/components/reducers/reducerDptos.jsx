const estadoInicial = '';

const reducerDptos = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'CargarDepartamentos':
            return [...state, action.payload];
        default:
            return state;
    }

};

export default reducerDptos;