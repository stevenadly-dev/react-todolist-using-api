import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";
import { authReducer } from "./auth/authReducer";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { todosReducer } from "./Todos/todosReducer";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'todos']
}


const myCompinedReducer = combineReducers({
    auth: authReducer,
    todos: todosReducer
})

const persistedReducer = persistReducer(persistConfig, myCompinedReducer)


export const store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(logger, thunk)
    // other store enhancers if any
));

export let persistor = persistStore(store);
