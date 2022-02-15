import { Form, Button, Alert } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDistance from 'geolib/es/getDistance'; //Libreria para calcular la distancia entre dos puntos
import Imagen from '../../img/loading.gif'


const FormularioEnvio = () => {
    console.log(`Se renderiza el componente FomrularioEnvio`)
    //#region datos del reduce
    const reduceDptos = useSelector((state) => state.reducerDptos);
    const departamentos = reduceDptos[0].departamentos;
    // console.log(`Los departamentos recibidos por reduce son: `, departamentos);

    const reduceCiudadesOrigen = useSelector((state) => state.reducerCdsOrig);
    const reduceCiudadesDestino = useSelector((state) => state.reducerCdsDes);
    //console.log(`Las ciudades origen desde el redux:`, reduceCiudadesOrigen);
    //console.log(`Las ciudades destino desde el redux:`, reduceCiudadesDestino);

    // let ciudadesOrigenTemp = ""
    // let ciudadesDestinoTemp = ""

    // if(reduceCiudadesOrigen){
    //     if(reduceCiudadesOrigen.Corresp === "ORIGEN"){
    //         reduceCiudadesOrigen = reduceCiudadesOrigen.payload[0].ciudades;

    //         dispatch( {type: 'CargarCiudades', payload: ciudades, corresponde: "ORIGEN"} );

    //     console.log("Las ciudades de origen son:", reduceCiudadesOrigen)
    //     }
    // }
    // if(reduceCiudadesDestino){
    //     if(reduceCiudadesDestino.Corresp === "DESTINO"){
    //         reduceCiudadesDestino = reduceCiudadesDestino.payload[0].ciudades;
    //     // console.log("Las ciudades de destino son:", ciudadesDestino)
    //     }
    // }



   

    const reduceCates = useSelector((state) => state.reducerCategs);
    const categorias = reduceCates[0].categorias;
    // console.log(`Las categs recibidos por reduce son: `, categorias);

    //#endregion


    const [banderaCiudadesOrigen, setBanderaCiudadesOrigen] = useState();
    const [banderaCiudadesDestino, setBanderaCiudadesDestino] = useState();




    const [mensajes, setMensajes] = useState('');
    const dispatch = useDispatch();

    //const envios = useSelector((state) => state.paquetesReducer);
    const ciudadOrigenRef = useRef(null);
    const ciudadDestinoRef = useRef(null);
    const catPaqueteRef = useRef(null);
    const pesoPaqueteRef = useRef(null);

    let usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));

    
    //#region Metodos
    const calcularPrecioEnvio = (peso, distancia) => {
        let precioBase = 50;
        let precioXKilo = 10;
        let recargoPorDistancia = Math.floor(distancia / 100) * 50; //Cada 100km se le suma 50 pesos, mathfloor para redondear

        return precioBase + (peso * precioXKilo) + recargoPorDistancia;
    }
    //#endregion

    const traerCiudadXId = (idCiudad) => {
        let ciudad = null;
        // console.log(`Las ciudades de origen son:`, reduceCiudadesOrigen);
        // console.log(`Las ciudades de destino son:`, reduceCiudadesDestino);

        if(reduceCiudadesOrigen.ciudades.find(c => c.id === parseInt(idCiudad))) {
            ciudad = reduceCiudadesOrigen.ciudades.find(c => c.id === parseInt(idCiudad));
            return ciudad;
        }
        if(reduceCiudadesDestino.ciudades.find(c => c.id === parseInt(idCiudad))) {
            ciudad = reduceCiudadesDestino.ciudades.find(c => c.id === parseInt(idCiudad));
            return ciudad;
        }
        return ciudad;
    }
    
    const calcularDistanciaEntreCiudades = (latOrigen, lonOrigen, latDestino, lonDestino) => {

        const distancia = getDistance(
            { latitude: latOrigen, longitude: lonOrigen },
            { latitude: latDestino, longitude: lonDestino });
        return  (distancia / 1000).toFixed(2); //Guardamos la distancia solo hasta dos decimales

    }

    // { latitude: ciudadOrigenObjeto.latitud, longitude: ciudadOrigenObjeto.longitud },
    // { latitude: ciudadDestinoObjeto.latitud, longitude: ciudadDestinoObjeto.longitud });


    const handlerEnvio = async (e) => {
        e.preventDefault();

        // if (e.current.value == undefined) {
        //     setMensajes('Todos los campos son obligatorios');
        //     return;
        // }
        // console.log(e.current.value)

        //Valores ingresados por el usuario
        // codigoCiudadOrigen = ciudadOrigenRef.current.value ? 
        // codigoCiudadDestino = ciudadDestinoRef.current.value;
        // catPaquete = catPaqueteRef.current.value;
        // pesoPaquete = pesoPaqueteRef.current.value;

        
        

        //#region [Validaciones]
        //1era parte - Validar que los departamentos hayan sido seleccionados y que la categoria y el peso no esten vacios
        if(ciudadOrigenRef.current == null || ciudadDestinoRef.current == null || catPaqueteRef.current.value === '' || pesoPaqueteRef.current.value === ''){
            setMensajes('Todos los campos son obligatorios');
            return;
        }
        //2da parte - Validar que se hayan seleccionado ciudades de origen y destino aun cuando los departamentos si esten seleccionados
        if(ciudadOrigenRef.current.value === '' || ciudadDestinoRef.current.value === ''){
            setMensajes('Las ciudades son obligatorias');
            return;
        }
        //#endregion

        const ciudadOrigenObjeto = traerCiudadXId(ciudadOrigenRef.current.value); //A traves del id de la ciudad que obtenemos del useRef, se obtiene el objeto completo
        const ciudadDestinoObjeto = traerCiudadXId(ciudadDestinoRef.current.value);

        let latOrigen =  ciudadOrigenObjeto.latitud;
        let lonOrigen = ciudadOrigenObjeto.longitud;
        let latDestino = ciudadDestinoObjeto.latitud;
        let lonDestino = ciudadDestinoObjeto.longitud;

        //Valores calculados
        let distanciaEnKms = calcularDistanciaEntreCiudades(latOrigen, lonOrigen, latDestino, lonDestino);

        const precioTotal = calcularPrecioEnvio(pesoPaqueteRef.current.value, distanciaEnKms);

        const objeto = {
            idUsuario: usuarioLogueado.idUsuario,
            idCiudadOrigen: ciudadOrigenRef.current.value,
            idCiudadDestino: ciudadDestinoRef.current.value,
            peso: pesoPaqueteRef.current.value,
            distancia: distanciaEnKms,
            precio: precioTotal,
            idCategoria: catPaqueteRef.current.value,            
        };

        const myHeaders = new Headers();

        myHeaders.append("apikey", usuarioLogueado.apiKey);
        myHeaders.append("Content-Type", "application/json");

        const cuerpoPost = JSON.stringify(objeto);

        const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: cuerpoPost,
              redirect: 'follow'
        };

        const laUrl = `https://envios.develotion.com/envios.php?idUsuario=${usuarioLogueado.idUsuario}`;

        fetch(`${laUrl}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.codigo !== 200) { //Si el codigo es diferente a 200, es porque hubo un error en la llamada, y lo mostramos en pantalla
                    setMensajes(`Error: ${result.mensaje}`);
                } else {
                    setMensajes(`Envío del usuario: "${usuarioLogueado.nombre}" agendado con éxito, 
                                 Monto total: $${precioTotal}, 
                                 Identificador de envío: ${result.idEnvio}`,);
                }
            })
            .catch((error) => {
                console.log(`Error del catch ${error}`)
            });
    }

    //#region API Ciudades
    const cargarCiudadesAPI = async (idDpto) => {
    // console.log(`Se llama a la api de ciudades con la ID: ${idDpto}`);
    const myHeaders = new Headers();
    myHeaders.append("apikey", usuarioLogueado.apiKey);
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    return await fetch(`https://envios.develotion.com/ciudades.php?idDepartamento=${idDpto}`, requestOptions)
                 .then(response => response.json())
                 .then(result => result)
                 .catch(error => console.log('error', error));
    };
    //#endregion

    const handleChangeSelectOrigen = async (e) => {
        setBanderaCiudadesOrigen(false);
        let idDptoOrigen = e.target.value;
        let ciudades = await cargarCiudadesAPI(idDptoOrigen);
        dispatch( {type: 'CargarCiudadesOrigen', payload: ciudades} );
        setBanderaCiudadesOrigen(true);
    }
    const handleChangeSelectDestino = async (e) => {
        setBanderaCiudadesDestino(false);
        let idDptoDestino = e.target.value;
        let ciudades = await cargarCiudadesAPI(idDptoDestino);
        dispatch( {type: 'CargarCiudadesDestino', payload: ciudades} );
        setBanderaCiudadesDestino(true);
    }
    
    const handlerCalculadora = () => {
        let ciudadOrigen = ciudadOrigenRef.current.value;
        let ciudadDestino = ciudadDestinoRef.current.value;

    }

    // useEffect(() => {
    //     const datosCargados = async() =>{ 
    //        await cargarAlDispatch(); 
    //        setBanderaLlamadasAPI(true);
    //      }
    //      datosCargados();
    //  }, []);

    // useEffect(() => {
    //     // const datosCargados = async() =>{ 
    //     //    await cargarAlDispatch(); 
    //     //    setBanderaCiudades(true);
         
    //     //  datosCargados();
    //  }, [banderaCiudades]);


  return (
      console.log('Se renderiza el formulario envio'),

    <div className='row justify-content-center mb-5'>
        <h2>Agregar un envío</h2>

        <Form className='col-10 col-md-6 col-lg-4 mt-4'>
            <Form.Group >

                <Form.Select onChange={handleChangeSelectOrigen} className="select mb-2" defaultValue="" required={true}  >
                    <option required={true} value="" disabled={true}>Departamento de origen</option>   
                    {departamentos.map((dptoO) => (
                        <option required={true}  key={dptoO.id} value={dptoO.id}> {dptoO.nombre} </option>
                    ))} 
                </Form.Select>

                    {/* Ciudades de acuerdo al dpto */}
                    { banderaCiudadesOrigen ?                
                    <Form.Select ref={ciudadOrigenRef} className="select mb-4 w-50 mb-5" defaultValue="" >
                        <option value="" disabled={true}>Ciudad de origen</option>
                        {/* console.log(reduceCiudadesOrigen)    */}
                        {reduceCiudadesOrigen.ciudades.map((ciuO) => (
                            <option key={ciuO.id} value={ciuO.id}> {ciuO.nombre} </option>
                        ))}
                    </Form.Select>
                    : ""}




                <Form.Select onChange={handleChangeSelectDestino} className="select mb-2" defaultValue="" >
                    <option  value="" disabled={true}>Departamento de destino</option>   
                    {departamentos.map((dptoO) => (
                        <option key={dptoO.id} value={dptoO.id}> {dptoO.nombre} </option>
                    ))} 
                </Form.Select>

                    {/* Ciudades de acuerdo al dpto */}
                    { banderaCiudadesDestino ?                
                    <Form.Select ref={ciudadDestinoRef} className="select mb-4 w-50 mb-5" defaultValue="" >
                        <option value="" disabled={true}>Ciudad de destino</option>   
                        {reduceCiudadesDestino.ciudades.map((ciuD) => (
                            <option key={ciuD.id} value={ciuD.id}> {ciuD.nombre} </option>
                        ))}
                    </Form.Select>
                    : ""}


                <Form.Select ref={catPaqueteRef} className="select mb-4" defaultValue="" > 
                <option value="" disabled={true}>Categoría del paquete</option> 
                    {categorias.map((categs) => (
                        <option key={categs.id} value={categs.id}> {categs.nombre} </option>
                    ))}      
                </Form.Select>

                <Form.Control required ref={pesoPaqueteRef}  className="input" type="number" min="0" step=".1" placeholder="Peso del paquete (en Kg.)" />
                
            </Form.Group>

            <Button onClick={handlerEnvio} className='rounded mt-4 py-1' id="btnAgregarEnvio" type="submit">
                Agregar envío
            </Button>
            <Button onClick={(en) => calcularDistanciaEntreCiudades(en, e.id) } variant="info" className='rounded mt-4 py-1 px-1' id="btnCalcularDistancia" type="submit">
                Calcular distancia
            </Button>
        </Form>

        {mensajes && <div className="row justify-content-center"><Alert className='col-4 mt-5 rounded justify-content-center' variant="warning">{mensajes}</Alert></div>} 

    </div>

  )
}

export default FormularioEnvio