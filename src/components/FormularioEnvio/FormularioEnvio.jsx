import { Form, Button, Alert } from 'react-bootstrap';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';
import getDistance from 'geolib/es/getDistance'; //Libreria para calcular la distancia entre dos puntos

const FormularioEnvio = () => {
    //#region Hooks y variables
    const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario'));
    const departamentos = useSelector((state) => state.reducerDptos);
    const categorias = useSelector((state) => state.reducerCategs);
    const ciudades = useSelector((state) => state.reducerCiudades);

    const [ciudadesOrigen, setCiudadesOrigen] = useState([]); //Array de objetos con las ciudades de origen
    const [ciudadesDestino, setCiudadesDestino] = useState([]); //Array de objetos con las ciudades de destino

    const [banderaCiudadesOrigen, setBanderaCiudadesOrigen] = useState(); //Bandera para saber si ya se eligieron los departamenos, si es asi, esto se setea y se muestran las ciudades
    const [banderaCiudadesDestino, setBanderaCiudadesDestino] = useState(); 

    const [mensajes, setMensajes] = useState(''); //Mensajes de error
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

    const calcularDistanciaEntreCiudades = (latOrigen, lonOrigen, latDestino, lonDestino) => {
        const distancia = getDistance(
            { latitude: latOrigen, longitude: lonOrigen },
            { latitude: latDestino, longitude: lonDestino });
        return  (distancia / 1000).toFixed(2); //Guardamos la distancia solo hasta dos decimales
    }

    const traerCiudadXIdDesdeReduce = (idCiudad) => {
        let ciudad = null;
        if(ciudades.find(c => c.id === parseInt(idCiudad))) { //Buscamos por id de ciudad y si existe retornamos el objeto
            return ciudades.find(c => c.id === parseInt(idCiudad)); 
        }
        return ciudad;
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
    

    //Metodo para obtener la ciudad mediante el departamento
    const obtenerCiudadesXDpto = (idDpto) => { //Recibe el id del departamento
        if(idDpto === '') {
            return null;
        } else {
            return ciudades.filter(c => c.id_departamento == idDpto); // Si matchea el id del departamento de la ciudad con el que recibimos retornamos un array con las ciudades de dicho departamento
        }
    }

    //#region Handlers y llamadas a la API
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

        const ciudadOrigenObjeto = traerCiudadXIdDesdeReduce(ciudadOrigenRef.current.value); //A traves del id de la ciudad que obtenemos del useRef (donde el usuario ingresa los datos), se obtiene el objeto completo
        const ciudadDestinoObjeto = traerCiudadXIdDesdeReduce(ciudadDestinoRef.current.value);

        const latOrigen =  ciudadOrigenObjeto.latitud; //Obtenemos las coordenadas de la ciudad de origen 
        const lonOrigen = ciudadOrigenObjeto.longitud; 
        const latDestino = ciudadDestinoObjeto.latitud; //Obtenemos las coordenadas de la ciudad de destino 
        const lonDestino = ciudadDestinoObjeto.longitud;

        const distanciaEnKms = calcularDistanciaEntreCiudades(latOrigen, lonOrigen, latDestino, lonDestino);
        const precioTotal = calcularPrecioEnvio(pesoPaqueteRef.current.value, distanciaEnKms);

        const objeto = { //Objeto que se enviara a la API para hacer el post
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
        const laUrl = `https://envios.develotion.com/envios.php?idUsuario=${usuarioLogueado.idUsuario}`; //le pasamos el id de usuario que lo obtenemos del sessionStorge para que el envio quede para dicho usuario
        fetch(`${laUrl}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.codigo !== 200) { 
                    setMensajes(`Error: ${result.mensaje}`); //Si el codigo es distinto de 200, es porque hubo un error, lo mostramos en el mensaje
                } else {
                    setMensajes(`Envío del usuario: "${usuarioLogueado.nombre}" agendado con éxito, 
                                 Monto total: $${precioTotal}, 
                                 Identificador de envío: ${result.idEnvio}`);

                    let objetoAlStore = { //Objeto conteniendo el envio que se guardara en el store de envios
                        id: result.idEnvio, //usamos la id que nos devuelve la respuesta de la api
                        ciudad_origen: ciudadOrigenObjeto.id,
                        ciudad_destino: ciudadDestinoObjeto.id,
                        peso: parseInt(pesoPaqueteRef.current.value), 
                        distancia: parseInt(distanciaEnKms), 
                        precio: precioTotal,
                        id_categoria: catPaqueteRef.current.value,
                        id_usuario: usuarioLogueado.idUsuario,
                    }
                    dispatch( {type: 'AgregarEnvio', payload: objetoAlStore} ); //Agregamos el envio al store
                }
            });
    }

    const handleChangeSelectOrigen = async (e) => { //Handler para el select de departamentos
        setBanderaCiudadesOrigen(false); //Por defecto la bandera es falsa
        const idDptoOrigen = e.target.value; //Obtenemos el id del departamento desde el select
        const respuestaCiudOrig = obtenerCiudadesXDpto(idDptoOrigen);  //Obtenemos las ciudades del departamento
        setCiudadesOrigen(respuestaCiudOrig); //Seteamos las ciudades de origen mediante el useState
        setBanderaCiudadesOrigen(true); //Cambiamos la bandera para que se muestre el select de ciudades correspondiente a dicho departamento
    }
    const handleChangeSelectDestino = async (e) => { 
        setBanderaCiudadesDestino(false);
        const idDptoDestino = e.target.value;
        const respuestaCiudDest = obtenerCiudadesXDpto(idDptoDestino);
        setCiudadesDestino(respuestaCiudDest);
        setBanderaCiudadesDestino(true);
    }
    //#endregion

    //#region Funcion de calculadora de distancia
    const calculadora = (e) => {
        e.preventDefault();

        if(!validarCiudadesVacias()) { //Validamos que las ciudades no esten vacias
            setMensajes('Debe seleccionar ambas ciudades');
            return;
        }

        const ciudadOrigen = traerCiudadXIdDesdeReduce(ciudadOrigenRef.current.value);  //Obtenemos el objeto completo de la ciudad de origen
        const ciudadDestino = traerCiudadXIdDesdeReduce(ciudadDestinoRef.current.value); //Obtenemos el objeto completo de la ciudad de destino

        const latOrigen =  ciudadOrigen.latitud;
        const lonOrigen = ciudadOrigen.longitud;
        const latDestino = ciudadDestino.latitud;
        const lonDestino = ciudadDestino.longitud;
        const dis = calcularDistanciaEntreCiudades(latOrigen, lonOrigen, latDestino, lonDestino); //Calculamos la distancia entre las ciudades con el mismo metodo que usamo para agregar un envio
        setMensajes(`La distancia entre ambas ciudades es: ${dis} Kms`);
    }
    //#endregion

    //#region Renderizado
    return (
      <section className='row justify-content-center'>
          <h2>Agregar un envío</h2>
          <Form className='col-10 col-md-6 col-lg-4 mt-4'>
              <Form.Group >             
                  {/* El defaultValue en todos los Form.Select es para que por defecto siempre se seleccione el primer option (el que no esta en el map) con el titulo o mensaje */}
                  {/* Select de departamentos de ORIGEN */}
                  <Form.Select onChange={handleChangeSelectOrigen} className="select mb-2" defaultValue="">
                      <option value="" disabled={true}>Departamento de origen</option>   
                      {departamentos.map((dptoO) => (
                          <option required={true}  key={dptoO.id} value={dptoO.id}> {dptoO.nombre} </option>
                      ))} 
                  </Form.Select>

                      {/* Ciudades de ORIGEN de acuerdo al dpto elegido, se muestra solo cuando la bandera este en true */}
                      { banderaCiudadesOrigen ?                
                      <Form.Select ref={ciudadOrigenRef} className="select mb-4 w-50 mb-5" defaultValue="" >
                          <option value="" disabled={true}>Ciudad de origen</option>
                          {ciudadesOrigen.map((ciuO) => (
                              <option key={ciuO.id} value={ciuO.id}> {ciuO.nombre} </option>
                          ))}
                      </Form.Select>
                      : ""}


                      {/* Select de departamentos DE DESTINO */}
                  <Form.Select onChange={handleChangeSelectDestino} className="select mb-2" defaultValue="" >
                      <option  value="" disabled={true}>Departamento de destino</option>   
                      {departamentos.map((dptoO) => (
                          <option key={dptoO.id} value={dptoO.id}> {dptoO.nombre} </option>
                      ))} 
                  </Form.Select>

                      {/* Ciudades de DESTINO de acuerdo al dpto elegido, se muestra solo cuando la bandera este en true */}
                      { banderaCiudadesDestino ?                
                      <Form.Select ref={ciudadDestinoRef} className="select mb-4 w-50 mb-5" defaultValue="" >
                          <option value="" disabled={true}>Ciudad de destino</option>   
                          {ciudadesDestino.map((ciuD) => (
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

                  {/* Input de peso del paquete, no admite fraccionados solo numeros enteros */}
                  <Form.Control ref={pesoPaqueteRef}  className="input" type="number" min="0" placeholder="Peso del paquete (en Kg.)" />       
              </Form.Group>

              {/* Boton de agregar nuevo envio */}
              <Button onClick={ handlerEnvio } className='rounded mt-4 py-1' id="btnAgregarEnvio" type="submit">
                  Agregar envío
              </Button>
               {/* Boton para la calculadora de distancias entre ciudades */}
              <Button onClick={ calculadora } variant="info" className='rounded mt-4 py-1 px-1' id="btnCalcularDistancia" type="submit">
                  Calcular distancia
              </Button>
          </Form>
                        
          {/* Mensajes de error y confirmacion, se muestran u ocultan dependiendo del estado de la bandera del useState */}
          {mensajes && <div className="row justify-content-center"><Alert className='col-4 mt-5 rounded justify-content-center' variant="info">{mensajes}</Alert></div>} 

      </section>

    )
    //#endregion
}

export default FormularioEnvio