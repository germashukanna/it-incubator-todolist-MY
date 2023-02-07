import {FieldErrorType} from "../api/types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {rootReducer} from "../app/reducers";


export  type RootReducerType = typeof rootReducer

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    AnyAction>
export type ThunkError = { rejectValue: { errors: Array<string>, fieldErrors?: Array<FieldErrorType> | undefined } }
