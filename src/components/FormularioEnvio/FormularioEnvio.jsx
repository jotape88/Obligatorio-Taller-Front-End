import { Form, Button, Alert } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistance } from 'geolib'; //Libreria para calcular la distancia entre dos puntos
import Imagen from '../../img/loading.gif'


const FormularioEnvio = () => {
    console.log(`Se renderiza el componente FomrularioEnvio`)
    //#region datos del reduce
    const reduceDptos = useSelector((state) => state.reducerDptos);
    const departamentos = reduceDptos[0].departamentos;
    // console.log(`Los departamentos recibidos por reduce son: `, departamentos);

    let reduceCiudadesOrigen = useSelector((state) => state.reducerCiudades);
    let reduceCiudadesDestino = useSelector((state) => state.reducerCiudades);
    // console.log(`Las ciduades como llegan:`, reduceCiudadesOrigen);


    if(reduceCiudadesOrigen){
        if(reduceCiudadesOrigen.Corresp === "ORIGEN"){
            reduceCiudadesOrigen = reduceCiudadesOrigen.payload[0].ciudades;
        console.log("Las ciudades de origen son:", reduceCiudadesOrigen)
        }
    }
    if(reduceCiudadesDestino){
        if(reduceCiudadesDestino.Corresp === "DESTINO"){
            reduceCiudadesDestino = reduceCiudadesDestino.payload[0].ciudades;
        // console.log("Las ciudades de destino son:", ciudadesDestino)
        }
    }



   

    const reduceCates = useSelector((state) => state.reducerCategs);
    const categorias = reduceCates[0].categorias;
    // console.log(`Las categs recibidos por reduce son: `, categorias);

    //#endregion


    const [banderaCiudadesOrigen, setBanderaCiudadesOrigen] = useState();
    const [banderaCiudadesDestino, setBanderaCiudadesDestino] = useState();




    const [mensajes, setMensajes] = useState('');
    const dispatch = useDispatch();

    //const envios = useSelector((state) => state.paquetesReducer);
    const ciudadOrigenRef = useRef();
    const ciudadDestinoRef = useRef();
    const catPaqueteRef = useRef();
    const pesoPaqueteRef = useRef();

    let usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));

    
    //#region Metodos
    const calcularPrecioEnvio = (peso, distancia) => {
        let precioBase = 50;
        let precioXKilo = 10;
        let recargoPorDistancia = Math.floor(distancia / 100) * 50; //Cada 100km se le suma 50 pesos, mathfloor para redondear

        return precioBase + (peso * precioXKilo) + recargoPorDistancia;
    }
    //#endregion

    const handlerEnvio = async (e) => {
        e.preventDefault();

        //Valores ingresados por el usuario
        let ciudadOrigen = ciudadOrigenRef.current.value;
        let ciudadDestino = ciudadDestinoRef.current.value;
        let catPaquete = catPaqueteRef.current.value;
        let pesoPaquete = pesoPaqueteRef.current.value;

        if (ciudadOrigen.length === 0 || ciudadDestino.length === 0 || catPaquete.length === 0 || pesoPaquete.length === 0) {
            setMensajes('Todos los campos son obligatorios');
            return;
        }

        //Valores calculados
        let distancia = getDistance(ciudadOrigen, ciudadDestino, 1);
        let precioTotal = calcularPrecioEnvio(pesoPaquete, distancia);

        let objeto = {
            idUsuario: usuarioLogueado.idUsuario,
            idCiudadOrigen: ciudadOrigen,
            idCiudadDestino: ciudadDestino,
            peso: pesoPaquete,
            distancia: distancia,
            precio: precioTotal,
            idCategoria: catPaquete,
            
        };

        let myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        let cuerpoPost = JSON.stringify(objeto);

        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: cuerpoPost,
            redirect: 'follow'
        };

        let laUrl = `https://envios.develotion.com/envios.php?idUsuario${usuarioLogueado.id}`;

        fetch(`${laUrl}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    setMensajes(result.error);
                } else {
                    setMensajes('Envio realizado con exito');
                    dispatch({ type: 'ENVIOS', payload: result });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    
    }

    //#region API Ciudades
    const cargarCiudadesAPI = async (idDpto) => {
    console.log(`Se llama a la api de ciudades con la ID: ${idDpto}`);
    let myHeaders = new Headers();
    myHeaders.append("apikey", usuarioLogueado.apiKey);
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
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
        console.log(ciudades);
        dispatch( {type: 'CargarCiudades', payload: ciudades, corresponde: "ORIGEN"} );
        setBanderaCiudadesOrigen(true);
    }

    const handleChangeSelectDestino = async (e) => {
        setBanderaCiudadesDestino(false);
        let idDptoOrigen = e.target.value;
        let ciudades = await cargarCiudadesAPI(idDptoOrigen);
        console.log(ciudades);
        dispatch( {type: 'CargarCiudades', payload: ciudades, corresponde: "DESTINO"} );
        setBanderaCiudadesDestino(true);
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

    <div className='row justify-content-center mt-5'>
        <h2>Agregar un envío</h2>

        <Form className='col-10 col-md-6 col-lg-4 mt-4'>
            <Form.Group >

                <Form.Select onChange={handleChangeSelectOrigen} ref={ciudadOrigenRef} className="select mb-2" defaultValue="titulo" >
                    <option value="titulo" disabled={true}>Departamento de origen</option>   
                    {departamentos.map((dptoO) => (
                        <option key={dptoO.id} value={dptoO.id}> {dptoO.nombre} </option>
                    ))} 
                </Form.Select>

                    {/* Ciudades de acuerdo al dpto */}
                    { banderaCiudadesOrigen ?                
                    <Form.Select className="select mb-4 w-50 mb-5" defaultValue="titulo" >
                        <option value="titulo" disabled={true}>Ciudad de origen</option>   
                        {reduceCiudadesOrigen.map((ciuO) => (
                            <option key={ciuO.id} value={ciuO.id}> {ciuO.nombre} </option>
                        ))}
                    </Form.Select>
                    : ""}




                <Form.Select onChange={handleChangeSelectDestino} ref={ciudadDestinoRef} className="select mb-2" defaultValue="titulo" >
                    <option value="titulo" disabled={true}>Departamento de destino</option>   
                    {departamentos.map((dptoO) => (
                        <option key={dptoO.id} value={dptoO.id}> {dptoO.nombre} </option>
                    ))} 
                </Form.Select>

                    {/* Ciudades de acuerdo al dpto */}
                    { banderaCiudadesDestino ?                
                    <Form.Select className="select mb-4 w-50 mb-5" defaultValue="titulo" >
                        <option value="titulo" disabled={true}>Ciudad de destino</option>   
                        {reduceCiudadesDestino.map((ciuD) => (
                            <option key={ciuD.id} value={ciuD.id}> {ciuD.nombre} </option>
                        ))}
                    </Form.Select>
                    : ""}


                <Form.Select ref={catPaqueteRef} className="select mb-4" defaultValue="titulo" > 
                <option value="titulo" disabled={true}>Categoría del paquete</option> 
                    {categorias.map((categs) => (
                        <option key={categs.id} value={categs.id}> {categs.nombre} </option>
                    ))}      
                </Form.Select>

                <Form.Control ref={pesoPaqueteRef}  className="input" type="number" min="0" step=".1" placeholder="Peso del paquete (en Kg.)" />
                
            </Form.Group>

            <input className='rounded me-2 mt-3' type='submit' value='Agregar envío' />
        </Form>
    </div>

  )
}

//onClick={"AGREGAR ENVIO DESPUES MODIFICAR ESO"} 

export default FormularioEnvio