import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const Sidebar = () => {
    const [buscar,setBuscar] = useState('');
    const navegar = useNavigate();

    const hacerBusqueda =(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const formulario = e.target as HTMLFormElement

        const inputValue = formulario.elements.namedItem("search_field") as HTMLInputElement;
        setBuscar(`/buscar/${inputValue.value}`);
        navegar(buscar, {replace: true})
    }
  return (
    <aside className="lateral">
            <div className="search">
                <h3 className="title">Buscador</h3>
                <form onSubmit={hacerBusqueda}>
                    <input type="text" name="search_field" />
                    <button id="search">Buscar</button>
                </form>
            </div>
{/* 
            <div className="add">
                <h3 className="title">Añadir pelicula</h3>
                <form>
                    <input type="text" id="title" placeholder="Titulo" />
                    <textarea id="description" placeholder="Descripción"></textarea>
                    <input type="submit" id="save" value="Guardar" />
                </form>
            </div> */}
        </aside>
  )
}
