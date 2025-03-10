import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido al blog con React</h1>
      <p>Blog desarrollado con el MERN Stack(Mongo, Express, React y NodeJS) </p>
      <Link to="/Articles" className='button'>Ver los artículos</Link> 

    </div>
  )
}
