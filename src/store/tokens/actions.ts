export type Action = {type: "ADD_TOKEN" | "ADD_ID", payload: string} /*Payload é o conteúdo que a action vai receber, ou seja, uma string, já que é o token */

export const addToken = (token: string): Action => ({
    type: "ADD_TOKEN",
    payload: token
});

//pega o ir do usuário no momento do login
export const addId = (id: string): Action =>({
    type: "ADD_ID",
    payload: id
})