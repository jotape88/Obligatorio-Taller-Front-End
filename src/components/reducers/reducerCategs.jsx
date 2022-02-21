const estadoInicial = '';

const reducerCategs = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'CargarCategorias':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default reducerCategs