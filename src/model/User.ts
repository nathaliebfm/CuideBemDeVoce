import Postagem from "./Postagem";

interface User{
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    postagem?: Postagem[] //linha adicionada para que o usuário possa ter suas postagens
}

export default User;