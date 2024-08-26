import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className="nav">
            <ul>
                <li><NavLink to="/Inicio">Inicio</NavLink></li>
                <li><NavLink to="/Articles">Artículos</NavLink></li>
                <li><NavLink to="/Create-Articles">Crear Artículo</NavLink></li>
                <li><NavLink to="#">Contacto</NavLink></li>
            </ul>
        </nav>
  )
}
