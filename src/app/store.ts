import {tasksReducer} from '../features/Todolist';
import {ActionCreatorsMapObject, AnyAction, bindActionCreators, combineReducers} from 'redux';
import {todolistsReducer} from "../features/Todolist";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./";
import {loginReducer} from "../features/Login";
import {configureStore} from "@reduxjs/toolkit";
import {useMemo} from "react";
import {useAppDispatch} from "./Hooks";
import {FieldErrorType} from "../api/todolist-api";

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

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
    return boundActions
}

export type ThunkError = { rejectValue: { errors: Array<string>, fieldErrors?: Array<FieldErrorType> | undefined } }


