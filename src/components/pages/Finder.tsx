import React, { useEffect, useState } from 'react'
import { IArticle } from '../../interfaces/IArticles';
import { Globals } from '../../helpers/Globals';
import { Axios } from '../../helpers/Axios';
import { List } from './List';
import { useParams } from 'react-router-dom';


export const Finder = () => {

  const params = useParams();
  
  const [article,setArtcile] = useState<IArticle[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect( () => {
    data();
   },[])
   useEffect( () => {
     data();
    },[params]) 

    const data = async () => {
    try{  
   const response = await Axios({
      url:`${Globals.url_api}${Globals.sitio_bucar}${params.buscar}`,
      method:"get"});
   
   if(response.data.status === "success"){
    setArtcile(response.data.articles);
    setLoading(response.cargando);
   }else{
    setLoading(response.cargando)
    setArtcile([])
   }
  }catch(error){
    console.log(error);
  }
   }

  if(loading){
    return(
      <>
      <h1>Cargando...</h1>
      </>
    )
  }
  return (
    <>       
    { article.length >= 1 ? <List article={article} setArticle={setArtcile}/> :  <h1>No Hay Artículos</h1> }       
   </>     
  )
}
