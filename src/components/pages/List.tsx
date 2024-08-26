import React from 'react'
import { IArticle } from '../../interfaces/IArticles'
import foto from '../../../public/Typescript_logo_2020.svg.png';
import { Globals } from '../../helpers/Globals';
import { Axios } from '../../helpers/Axios';
import { Link } from 'react-router-dom';

interface ListProps{
    article: IArticle[],
    setArticle : React.Dispatch<React.SetStateAction<IArticle[]>>
}

export const List : React.FC<ListProps> = ({article,setArticle}) => {

  const eliminar = async(id: string) =>{
    const response = await Axios({
      url:`${Globals.url_api}${Globals.sitio_article}${id}`,
      method:"delete"
    })

    if(response.data.status === "success"){
      const flitred_articles = article.filter((arti) => arti._id !== id )
      setArticle(flitred_articles)
    }
  }

  return (
    article.map(arti =>{
      const ruta =`${Globals.url_api}${Globals.sitio_img}${arti.img}`;
        return (
          <article key={arti._id} className="article-item">
        <div className='mascara'>
         { (arti.img === 'default.png') ? <img src={foto}></img> :<img src={ruta}></img> }
        </div>

        <div className='datos'>
        <h3 className="title"><Link to={`/article/${arti._id}`}>{arti.title}</Link></h3>
          <p className="description">{arti.content}</p>

          <Link to={`/editar/${arti._id}`} className="edit">Editar</Link>
          <button className="delete" onClick={()=>eliminar(arti._id)}>Borrar</button>
        </div>
        
      </article>
        )
      })
  )
}
