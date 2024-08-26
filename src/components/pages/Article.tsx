import React, { useEffect, useState } from 'react'
import { IArticle } from '../../interfaces/IArticles';
import { Globals } from '../../helpers/Globals';
import { Axios } from '../../helpers/Axios';
import { useParams } from 'react-router-dom';
import foto from '../../../public/Typescript_logo_2020.svg.png';


export const Article = () => {

  const [article,setArtcile] = useState<IArticle>();
  const [loading,setLoading] = useState(true);
  const params = useParams();

 
     const data = async () => {
    try{  
   const {data,cargando} = await Axios({
      url:`${Globals.url_api}${Globals.sitio_article}${params.id}`,
      method:"get"});
   
   if(data.status === "success"){
    setArtcile(data.consulta);
    setLoading(cargando);
   }else{
    console.log(data.error);
    
   }
  }catch(error){
    console.log(error);
  }
   }
   useEffect( () => {
   data();
  },[])
  if(loading){
    return(
      <>
      <h1>Cargando...</h1>
      </>
    )
  }
  const ruta =`${Globals.url_api}${Globals.sitio_img}${article?.img}`;
  return (
    <div className='jumbo'>       
    { article ? ( 
      <>
       <div className='mascara'>
         { (article.img === 'default.png') ? <img src={foto}></img> :<img src={ruta}></img> }
        </div>
      <h1>{article.title}</h1>
      <span>{article.date}</span>
      <p>{article.content}</p>
      </>
    )
     :  <h1>No Hay Artículos</h1> }       
   </div>     
  )
}
