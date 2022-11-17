import {Action} from "./actions"
/*Colocar import {} traz a facilidade de não precisar lembrar o nome da função, só dar um ctrl+espaço */

export interface TokenState{
    tokens: string,
    id: string
}

const initialState = {
    tokens: "",
    id: ""
}
/*Tokens e id iniciam vazios, pois quando a pessoa acessa ainda não tem token ou id*/

export const tokensReducer = (state: TokenState = initialState, action: Action) => {
    switch(action.type) {
        case "ADD_TOKEN": {
            return {tokens: action.payload, id: state.id}
        }
        case "ADD_ID": {
            return {id: action.payload, tokens: state.tokens}
        }
        default: return state
    }
} //Ele vai armezar ou o Token ou o ID, dependendo da informação que chegar pelo método