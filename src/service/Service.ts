import axios from "axios";

export const api = axios.create({
    baseURL: "https://blogpessoal-ryyr.onrender.com/"
})

export const cadastroUsuario = async(url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

/* => Cria uma função sem nome (arrow function)*/ 
export const login = async(url: any, dados: any, setDados: any) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}
/*Como o back demora para enviar essa informação, temos que criar a função assíncrona para o front esperar*/
// Antes o set dados pegava só o token, agora pedimod para ele pegar o JSON inteiro, assim temos acesso tanto ao token, quanto ao ID

/*A busca é um get, então não serão passados dados, só recebe dados. Além disso, precisamos colocar o token no header, como no insomnia*/
export const busca = async (url: any, setDados: any, header: any) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}
/*Esse get vai pegar do back (api) o url e o header, para confirmar que o usuário está autenticado, armazenando a informação em resposta, e a
i tendo esses dados, vai fornecer as informações de temas ou postagens que pedirmos */

export const buscaId = async(url: any,setDados: any, header: any) => { 
    const resposta = await api.get(url,header)
    setDados(resposta.data)
}

export const post = async(url: any, dados: any, setDados: any, header: any) => { 
    const resposta = await api.post(url,dados,header)
    setDados(resposta.data)
}

export const put = async(url: any, dados: any, setDados: any, header: any) => { 
    const resposta = await api.put(url,dados,header)
    setDados(resposta.data)
}

export const deleteId = async(url: any,header: any) => { 
    await api.delete(url,header)
}