import React, { FormEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Axios } from "../../helpers/Axios";
import { Globals } from "../../helpers/Globals";

export const Create = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const save_article = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Guardar Informacion
    const response = await Axios({
      url: `${Globals.url_api}${Globals.sitio_crear}`,
      method: "post",
      save_data: formulario,
    });

    if (response.data.status === "success") {
      setResultado("guardado");

      //Subir la IMG
      const fileInput =
        (document.querySelector("#file") as HTMLInputElement) || null;

      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const formData = new FormData();

        formData.append("file0", fileInput.files[0]);
        // Verificar el contenido del formData

        const datos = await Axios({
          url: `${Globals.url_api}${Globals.upload_img}${response.data.article._id}`,
          method: "post",
          save_data: formData,
          file: true,
        });
        if (datos.data.status === "success") {
          setResultado("guardado");
        } else {
          setResultado("error");
        }
      }
    } else {
      setResultado("error");
    }
  };

  return (
    <div className='jumbo'>
      <h1>Crear Artículo</h1>
      <p>Formulario para crear artículo</p>
      <strong>
        {resultado === "guardado" ? "Artículo guardado con éxito!!" : ""}
      </strong>
      <strong>
        {resultado === "error"
          ? "Los datos proporcionados son incorrectos"
          : ""}
      </strong>

      {/*montar formulario*/}
      <form className='formulario' onSubmit={save_article}>
        <div className='form-group'>
          <label htmlFor='title'>Título</label>
          <input type='text' name='title' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='content'>Contenido</label>
          <textarea name='content' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor='file0'>Imagen</label>
          <input type='file' name='file0' id='file' />
        </div>

        <input type='submit' value='Guardar' className='btn btn-success' />
      </form>
    </div>
  );
};
