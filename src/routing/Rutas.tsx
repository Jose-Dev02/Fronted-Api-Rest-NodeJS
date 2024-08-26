import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Inicio } from "../components/pages/Inicio.tsx";
import { Header } from "../components/layout/Header.tsx";
import { Nav } from "../components/layout/Nav.tsx";
import { Sidebar } from "../components/layout/Sidebar.tsx";
import { Footer } from "../components/layout/Footer.tsx";
import { Create } from "../components/pages/Create.tsx";
import { Articles } from "../components/pages/Articles.tsx";
import { Finder } from "../components/pages/Finder.tsx";
import { Article } from "../components/pages/Article.tsx";
import { Edit } from "../components/pages/Edit.tsx";

export const Rutas = () =>{
return(
    <BrowserRouter>
    {/*LAYOUT */}
    <Header/>
    <Nav/>

    {/* Contenido central y rutas */}
    <section id="content" className="content">
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/Inicio" element={<Inicio/>}/>
        <Route path="/Articles" element={<Articles/>}/>
        <Route path="/Create-Articles" element={<Create/>}/>
        <Route path="/Buscar/:buscar" element={<Finder/>}/>
        <Route path="/article/:id" element={<Article/>}/>
        <Route path="/Editar/:id" element={<Edit/>}/>

        <Route path="*" element={
            <div className="jumbo">
                <h1>EROR 404</h1>
            </div>}/>
    </Routes>

    </section>

    <Sidebar/>
    <Footer/>
    </BrowserRouter>
)
}