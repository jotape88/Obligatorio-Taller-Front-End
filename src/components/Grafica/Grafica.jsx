import React from "react";
import Chart from "react-apexcharts";

const Grafica = ({ datos, categorias, ciudades }) => {
    console.log(`Los datos que recibe la grafica son: `, datos, categorias, ciudades);
    const state = {
      options: {
        chart: {
          id: "apexchart-example",
        },
        xaxis: {
          categories: ciudades,
        },
      },
      series: [
        {
          name: categorias,
          data: datos,
        },
      ],
    };
  
    return (
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width={500}
        height={320}
      />
    );
  };

export default Grafica