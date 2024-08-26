import axios, { AxiosResponse } from "axios";

interface AxiosOptions {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  save_data?: any;
  file?: boolean; 
}

export const Axios = async ({ url, method, save_data = {},file = false }: AxiosOptions) => {
  let cargando = true;
  let data;

  try {
    if(!file){
      const response: AxiosResponse = await axios({
        url,
        method,
        data: (method === 'post' || method === 'put')? save_data : undefined,
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = response.data;
    }else{
      if(method === 'get' || method === 'delete') throw new Error("Only can be used on post or put method");

      const response: AxiosResponse = await axios({
        url,
        method: (method === 'post' || method === 'put') ? method : (""),
        data: save_data ,
        
      });
      data = response.data;
      
    }
    

    
  } catch (error: any) {
    console.error("Error making request:", error);
    data = error.response.data;
  } finally {
    cargando = false;
  }

  return {
    data,
    cargando,
  };
};
