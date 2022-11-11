import {Action} from "./actions"
/*Colocar import {} traz a facilidade de não precisar lembrar o nome da função, só dar um ctrl+espaço */

export interface TokenState{
    tokens: string
}

const initialState = {
    tokens: ""
}
/*Tokens inicia vazio, pois quando a pessoa entra ainda não tem token*/

export const tokensReducer = (state: TokenState = initialState, action: Action) => {
    switch(action.type) {
        case "ADD_TOKEN": {
            return {tokens: action.payload}
        }

        default: return state
    }
}