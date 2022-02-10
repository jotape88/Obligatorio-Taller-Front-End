// import logo from './logo.svg';
// import './App.css';
// import React from 'react'

// const App = () => {
//   return (
//     <main className='container-fluid'>
//       <section className='row justify-content-center'>
//         <form className='col-3 p-5 text-center pt-5 mt-5 justify-content-center' >
//           <input className='py-1 w-100 mb-2 text rounded mb-3' type='text' placeholder='Usuario'  />
//           <input className='py-1 w-100 mb-2 text rounded' type='password' placeholder='Contraseña'  />
//           <input className='rounded me-2 mt-3' type='submit' value='Ingresar' />
//           <input className='rounded ms-2 mt-3' type='submit' value='Registrarse' />
//         </form>
//       </section>
//     </main>
//     );
// }

// export default App;


import React from "react";
const MiComponente = () => {
 const handleClick = (e) => {  //Recibo como parametro “e” el evento del click anterior
   console.log(`e`, e.target); //Con .target lo puedo descomponer y ver de donde vino
 };
 return (
   <div>
 	<button onClick={handleClick}>Boton</button>
   </div>
 );
};
export default MiComponente;