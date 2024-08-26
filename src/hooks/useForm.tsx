import { useState, FormEvent, ChangeEvent } from "react";

interface FormularioState {
  [key: string]: any;
}

export const useForm = (objetoInicial: FormularioState = {}) => {
  const [formulario, setFormulario] = useState<FormularioState>(objetoInicial);

  const serializarFormulario = (formulario: HTMLFormElement): FormularioState => {
    const formData = new FormData(formulario);
    const objetoCompleto: FormularioState = {};

    for (let [name, value] of formData.entries()) {
      objetoCompleto[name] = value;
    }

    return objetoCompleto;
  };

  const enviado = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let curso = serializarFormulario(e.currentTarget);

    setFormulario(curso);
    document.querySelector(".codigo")?.classList.add("enviado");
  };

  const cambiado = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  return {
    formulario,
    enviado,
    cambiado,
  };
};
