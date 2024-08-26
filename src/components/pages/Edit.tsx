import React,{FormEvent, useEffect, useState} from 'react'
import { useForm } from '../../hooks/useForm'
import { Axios } from '../../helpers/Axios';
import { Globals } from '../../helpers/Globals';
import { useParams } from 'react-router-dom';
import { IArticle } from '../../interfaces/IArticles';
import foto from '../../../public/Typescript_logo_2020.svg.png';


export const Edit = () => {

  const {formulario,enviado,cambiado} = useForm({});
  const [resultado,setResultado] = useState("no_enviado");
  
  const [article,setArtcile] = useState<IArticle>();
  const [loading,setLoading] = useState(true);
  const params = useParams();

  useEffect(()=>{
    data();
  },[])
  const data = async () => {
    try{  
   const {data,cargando} = await Axios({
      url:`${Globals.url_api}${Globals.sitio_article}${params.id}`,
      method:"get"});
   
   if(data.status === "success"){
    setArtcile(data.consulta);
    setLoading(cargando); 
   }else{
    setLoading(cargando)
    
   }
  }catch(error){
    console.log(error);
  }
   }
   if(loading){
    return(
      <div className='jumbo'>
        <h1>Cargando...</h1>
      </div>
    )
   }



  const edit_article = async (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    
    //Guardar Informacion
    const response = await Axios({
      url :`${Globals.url_api}${Globals.sitio_article}${params.id}`,
      method: "put", 
      save_data: formulario})
    if(response.data.status === "success"){
      setResultado("guardado");

      //Subir la IMG
      const fileInput = document.querySelector("#file") as HTMLInputElement || null;
      
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        

      const formData = new FormData();

      formData.append('file0',fileInput.files[0]);
       // Verificar el contenido del formData
   
      const datos = await Axios({
        url :`${Globals.url_api}${Globals.upload_img}${response.data.consulta._id}`,
        method: "post", 
        save_data: formData,
        file:true
      }) 
      if(datos.data.status === 'success'){
        setResultado("guardado")
      }else{
        setResultado("error");
      }
    }
    }else{
      setResultado("error");
    }

   
  }

  const ruta =`${Globals.url_api}${Globals.sitio_img}${article?.img}`;

  return (
    <div className='jumbo'>
      <h1>Editar Artículo</h1>
      <p>Formulario para editar: {article?.title}</p>
      <strong>{resultado === 'guardado' ? "Artículo guardado con éxito!!" :"" }</strong>
      <strong>{resultado === 'error' ? "Los datos proporcionados son incorrectos" :"" }</strong>
      
      {/*montar formulario*/}
      <form className='formulario' onSubmit={edit_article}>
        
        <div className='form-group'>
          <label htmlFor='title'>Título</label>
          <input type='text' name='title' onChange={cambiado} defaultValue={article?.title}/>

        </div>

        <div className='form-group'>
          <label htmlFor='content'>Contenido</label>
          <textarea name='content' onChange={cambiado} defaultValue={article?.content}/>

        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <div className='mascara'>
         { (article?.img === 'default.png') ? <img src={foto}></img> :<img src={ruta}></img> }
        </div>
          <input type='file' name='file0' id='file'/>

        </div>

        <input type='submit' value="Guardar" className='btn btn-success'/>

      </form>
    </div>
  )
}
