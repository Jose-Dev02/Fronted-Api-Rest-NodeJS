import React, { useEffect, useState } from 'react'
import { IArticle } from '../../interfaces/IArticles';
import { Globals } from '../../helpers/Globals';
import { Axios } from '../../helpers/Axios';
import { List } from './List';


export const Articles = () => {

  const [article,setArtcile] = useState<IArticle[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect( () => {
     const data = async () => {
    try{  
   const {data,cargando} = await Axios({
      url:`${Globals.url_api}${Globals.sitio_articles}`,
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

   data();
  },[])
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
