interface UserLogin{
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    token: string; /*? significa que ele é opcional e o null coloca pois inicialmente ele é nulo e depois vira string*/
}

export default UserLogin;

