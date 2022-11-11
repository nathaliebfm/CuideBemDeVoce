export type Action = {type: "ADD_TOKEN", payload: string} /*Payload é o conteúdo que a action vai receber, ou seja, uma string, já que é o token */

export const addToken = (token: string): Action => ({
    type: "ADD_TOKEN",
    payload: token
});