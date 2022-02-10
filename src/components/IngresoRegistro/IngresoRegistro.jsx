import React from 'react'

const IngresoRegistro = () => {
  return (

    <div className='formularioRegistro row justify-content-center'>

        <form className='col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 p-5 text-center pt-5 mt-5 justify-content-center' >
          <input className='py-1 w-100 mb-2 text rounded mb-3' type='text' placeholder='Usuario'  />
          <input className='py-1 w-100 mb-2 text rounded' type='password' placeholder='Contraseña'  />
          <input className='rounded me-2 mt-3' type='submit' value='Ingresar' />
          <input className='rounded ms-2 mt-3' type='submit' value='Registrarse' />
        </form>

    </div>
  )
}

export default IngresoRegistro