import {tasksReducer} from '../features/Todolist/tasks-reducer';
import {AnyAction, combineReducers} from 'redux';
import {todolistsReducer} from "../features/Todolist/todolist-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {loginReducer} from "../features/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    appReducer: appReducer,
    login: loginReducer
})
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunk));

export  type RootReducerType = typeof rootReducer

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>
// type AppActionType = TodolistDomainType
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    AnyAction>

// @ts-ignore
window.store = store;


