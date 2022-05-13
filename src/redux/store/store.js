import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { guardarLocalStorage, obtenerLocalStorage } from "../../utils/LocalStorage";
import { shoppingCartReducer } from "../reducers/shoppingCartReducer";
import { loginReducer } from "../reducers/loginReducer";
import { registerReducer } from "../reducers/registerReducer";
import { commentsReducer } from "../reducers/commentsReducer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const storageState = obtenerLocalStorage();

const reducersEnviar = combineReducers({
    login: loginReducer,
    register: registerReducer,
    cart: shoppingCartReducer,
    comments: commentsReducer,
})

export const store = createStore(
    reducersEnviar,
    storageState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

store.subscribe(() => {
    guardarLocalStorage(
        {
           modal: store.getState().modal
        },
   )
})
