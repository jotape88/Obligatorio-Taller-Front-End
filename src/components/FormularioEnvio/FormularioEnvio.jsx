import { Form, Button, Alert } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';
import getDistance from 'geolib/es/getDistance'; //Libreria para calcular la distancia entre dos puntos
import Imagen from '../../img/loading.gif'

const FormularioEnvio = () => {
    //#region Hooks y variables
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const reduceDptos = useSelector((state) => state.reducerDptos);
    const departamentos = reduceDptos[0].departamentos;
    const reduceCiudadesOrigen = useSelector((state) => state.reducerCdsOrig);
    const reduceCiudadesDestino = useSelector((state) => state.reducerCdsDes);
    const reduceCates = useSelector((state) => state.reducerCategs);
    const categorias = reduceCates[0].categorias;
    const [banderaCiudadesOrigen, setBanderaCiudadesOrigen] = useState();
    const [banderaCiudadesDestino, setBanderaCiudadesDestino] = useState();
    const [mensajes, setMensajes] = useState('');
    const ciudadOrigenRef = useRef(null);
    const ciudadDestinoRef = useRef(null);
    const catPaqueteRef = useRef(null);
    const pesoPaqueteRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //#endregion
   
    //#region Metodos
    const calcularPrecioEnvio = (peso, distancia) => {
        const precioBase = 50;
        const precioXKilo = 10;
        const recargoPorDistancia = Math.floor(distancia / 100) * 50; //Cada 100km se le suma 50 pesos, usamos mathfloor para redondear

        return distancia >= 100 ? precioBase + (peso * precioXKilo) + recargoPorDistancia  : precioBase + (peso * precioXKilo); 
    }

    const traerCiudadXIdDesdeReduce = (idCiudad) => {
        let ciudad = null;
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
    //#endregion

    //#region Validaciones
    //1era parte - Validar que los departamentos hayan sido seleccionados y que la categoria y el peso no esten vacias
    const validarCamposVacios = () => {
        if(ciudadOrigenRef?.current == null || ciudadDestinoRef?.current == null || catPaqueteRef?.current.value === '' || pesoPaqueteRef?.current.value === ''){
            return false;
        } else {
            return true;
        }
    }

    //2da validacion - Validamos que se hayan seleccionado ciudades de origen y destino aun cuando los departamentos si esten seleccionados
    const validarCiudadesVacias = () => {
        if(ciudadOrigenRef?.current?.value == '' || ciudadDestinoRef?.current?.value == '' || ciudadOrigenRef?.current?.value === undefined || ciudadDestinoRef?.current?.value === undefined) {
            return false;
        } else {
            return true;
        }
    }
    //#endregion
    

    //#region Llamadas a la API
    const cargarCiudadesAPI = async (idDpto) => {
        const myHeaders = new Headers();
        myHeaders.append("apikey", usuarioLogueado.apiKey);
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        return await fetch(`https://envios.develotion.com/ciudades.php?idDepartamento=${idDpto}`, requestOptions)
                     .then((response) => {
                         return new Promise((resolve, reject) => {
                           if (response.status == 200) {
                             return resolve(response.json());
                           } else {
                             return reject("Error");
                           }
                         });
                       })            
    };
    //#endregion

    //#region Handlers
    const handlerEnvio = async (e) => {
        e.preventDefault();

        if(!validarCamposVacios()) {
            setMensajes('Todos los campos son obligatorios');
            return;
        }
        if(!validarCiudadesVacias()) {
            setMensajes('Las ciudades son obligatorias');
            return;
        }

        const ciudadOrigenObjeto = traerCiudadXIdDesdeReduce(ciudadOrigenRef.current.value); //A traves del id de la ciudad que obtenemos del useRef, se obtiene el objeto completo
        const ciudadDestinoObjeto = traerCiudadXIdDesdeReduce(ciudadDestinoRef.current.value);

        const latOrigen =  ciudadOrigenObjeto.latitud;
        const lonOrigen = ciudadOrigenObjeto.longitud;
        const latDestino = ciudadDestinoObjeto.latitud;
        const lonDestino = ciudadDestinoObjeto.longitud;

        const distanciaEnKms = calcularDistanciaEntreCiudades(latOrigen, lonOrigen, latDestino, lonDestino);
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
                if (result.codigo !== 200) { 
                    setMensajes(`Error: ${result.mensaje}`);
                } else {
                    setMensajes(`Envío del usuario: "${usuarioLogueado.nombre}" agendado con éxito, 
                                 Monto total: $${precioTotal}, 
                                 Identificador de envío: ${result.idEnvio}`);
                    let objetoAlStore = {
                        id: usuarioLogueado.idUsuario,
                        ciudad_origen: ciudadOrigenObjeto.id,
                        ciudad_destino: ciudadDestinoObjeto.id,
                        peso: parseInt(pesoPaqueteRef.current.value),
                        distancia: parseInt(distanciaEnKms),
                        precio: precioTotal,
                        categoria: catPaqueteRef.current.value,
                    }
                    dispatch( {type: 'AgregarEnvio', payload: objetoAlStore} );
                }
            });
    }

    const handleChangeSelectOrigen = async (e) => {
        setBanderaCiudadesOrigen(false);
        const idDptoOrigen = e.target.value;
        const ciudades = await cargarCiudadesAPI(idDptoOrigen);
        dispatch( {type: 'CargarCiudadesOrigen', payload: ciudades} );
        setBanderaCiudadesOrigen(true);
    }
    const handleChangeSelectDestino = async (e) => {
        setBanderaCiudadesDestino(false);
        const idDptoDestino = e.target.value;
        const ciudades = await cargarCiudadesAPI(idDptoDestino);
        dispatch( {type: 'CargarCiudadesDestino', payload: ciudades} );
        setBanderaCiudadesDestino(true);
    }
    
    const handlerCalculadora = (e) => {
        e.preventDefault();

        if(!validarCiudadesVacias()) {
            setMensajes('Debe seleccionar ambas ciudades');
            return;
        }

        const ciudadOrigen = traerCiudadXIdDesdeReduce(ciudadOrigenRef.current.value); 
        const ciudadDestino = traerCiudadXIdDesdeReduce(ciudadDestinoRef.current.value);

        const latOrigen =  ciudadOrigen.latitud;
        const lonOrigen = ciudadOrigen.longitud;
        const latDestino = ciudadDestino.latitud;
        const lonDestino = ciudadDestino.longitud;
        const dis = calcularDistanciaEntreCiudades(latOrigen, lonOrigen, latDestino, lonDestino)
        setMensajes(`La distancia entre ambas ciudades es: ${dis} Kms`);
    }
    //#endregion

    //#region Renderizado
    return (
      <section className='row justify-content-center'>
          <h2>Agregar un envío</h2>
          <Form className='col-10 col-md-6 col-lg-4 mt-4'>
              <Form.Group >
                      {/* Select de departamentos */}
                  <Form.Select onChange={handleChangeSelectOrigen} className="select mb-2" defaultValue="" required={true}  >
                      <option required={true} value="" disabled={true}>Departamento de origen</option>   
                      {departamentos.map((dptoO) => (
                          <option required={true}  key={dptoO.id} value={dptoO.id}> {dptoO.nombre} </option>
                      ))} 
                  </Form.Select>

                      {/* Ciudades de acuerdo al dpto elegido */}
                      { banderaCiudadesOrigen ?                
                      <Form.Select ref={ciudadOrigenRef} className="select mb-4 w-50 mb-5" defaultValue="" >
                          <option value="" disabled={true}>Ciudad de origen</option>
                          {reduceCiudadesOrigen.ciudades.map((ciuO) => (
                              <option key={ciuO.id} value={ciuO.id}> {ciuO.nombre} </option>
                          ))}
                      </Form.Select>
                      : ""}


                      {/* Select de departamentos */}
                  <Form.Select onChange={handleChangeSelectDestino} className="select mb-2" defaultValue="" >
                      <option  value="" disabled={true}>Departamento de destino</option>   
                      {departamentos.map((dptoO) => (
                          <option key={dptoO.id} value={dptoO.id}> {dptoO.nombre} </option>
                      ))} 
                  </Form.Select>

                      {/* Ciudades de acuerdo al dpto elegido */}
                      { banderaCiudadesDestino ?                
                      <Form.Select ref={ciudadDestinoRef} className="select mb-4 w-50 mb-5" defaultValue="" >
                          <option value="" disabled={true}>Ciudad de destino</option>   
                          {reduceCiudadesDestino.ciudades.map((ciuD) => (
                              <option key={ciuD.id} value={ciuD.id}> {ciuD.nombre} </option>
                          ))}
                      </Form.Select>
                      : ""}

                  {/* Select de categorias */}
                  <Form.Select ref={catPaqueteRef} className="select mb-4" defaultValue="" > 
                  <option value="" disabled={true}>Categoría del paquete</option> 
                      {categorias.map((categs) => (
                          <option key={categs.id} value={categs.id}> {categs.nombre} </option>
                      ))}      
                  </Form.Select>

                  {/* Input de peso del paquete */}
                  <Form.Control ref={pesoPaqueteRef}  className="input" type="number" min="0" step=".1" placeholder="Peso del paquete (en Kg.)" />       
              </Form.Group>

              {/* Botones de envio */}
              <Button onClick={ handlerEnvio } className='rounded mt-4 py-1' id="btnAgregarEnvio" type="submit">
                  Agregar envío
              </Button>
              <Button onClick={ handlerCalculadora } variant="info" className='rounded mt-4 py-1 px-1' id="btnCalcularDistancia" type="submit">
                  Calcular distancia
              </Button>
          </Form>
                        
          {/* Mensajes de error y confirmacion */}
          {mensajes && <div className="row justify-content-center"><Alert className='col-4 mt-5 rounded justify-content-center' variant="warning">{mensajes}</Alert></div>} 

      </section>

    )
    //#endregion
}

export default FormularioEnvio