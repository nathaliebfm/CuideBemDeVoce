import { tokensReducer } from "./tokens/tokensReducer";
import {createStore} from "redux"

const store = createStore(tokensReducer)

export default store