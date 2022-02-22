import React from "react";
import Grafica from "../Grafica/Grafica";
import { useSelector } from "react-redux";

const GraficoEnvXCateg = () => {
    const reduceEnvios = useSelector((state) => state.reducerEnvios);
    const reduceCategorias = useSelector((state) => state.reducerCategs);
  
    let idCategoriasEnvios = [];
    let nombresCategorias = [];
  
    const obtenerOrdenados = () => {

        const mapaEnvios = new Map();

        reduceEnvios.forEach(e => {
            let categoria = e.id_categoria;
            idCategoriasEnvios.push(categoria);    
        });

        //buscar un id de reducecategoria que este en idCategoriasEnvios
        reduceCategorias.forEach(c => {
            let id = c.id;
            if(idCategoriasEnvios.includes(id)){
                nombresCategorias.push(c.nombre);
            }
        });

        // reduceCategorias.map(c => {
        //     if (c.id.has(idCategoriasEnvios)) {
        //         nombresCategorias.push(c.nombre);
        //     }
        // });

        //Sumamos los envios de cada categoria
        let cantidad = mapaEnvios.get(idCategoriasEnvios);
        ++cantidad;
        mapaEnvios.set(idCategoriasEnvios, cantidad);

        //Guardamos los envios de cada categoria en un mapa
        if (!mapaEnvios.has(nombresCategorias)) {
          mapaEnvios.set(idCategoriasEnvios, 0);
        }

      //Ordenamos el mapa por cantidad de envios
      let datos = Array.from(mapaEnvios.values());
      let categorias = Array.from(mapaEnvios.keys());
      console.log(`datos, categorias`, datos, categorias);
      return { categorias, datos };
    };
  
    const data = obtenerOrdenados();
  
    return (
      <>
        {"ENTO"}
        <Grafica {...data}></Grafica>
      </>
    );
};

export default GraficoEnvXCateg
