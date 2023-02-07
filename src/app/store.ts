import {tasksReducer, todolistsReducer} from '../features/Todolist';
import {combineReducers} from 'redux';
import thunk from "redux-thunk";
import {loginReducer} from "../features/Login";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "../features/App";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    appReducer: appReducer,
    login: loginReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})



// @ts-ignore
window.store = store;



