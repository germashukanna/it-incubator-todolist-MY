import {errorAppStatusAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ActionType} from "../features/Todolist/tasks-reducer";
import {ResponseType} from "../api/tasks-api";
import {AxiosError} from "axios";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ActionType>,
                                        showError = true) => {
    if (showError) {
        if (data.messages.length) {
            dispatch(errorAppStatusAC({error: data.messages[0]}))
        } else {
            dispatch(errorAppStatusAC({error: "Some error occurred"}))
        }
    }
    dispatch(setAppStatusAC({status: "failed"}))
}

export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch<ActionType>,
                                         showError = true) => {
    if (showError) {
        dispatch(errorAppStatusAC({error: error.message ? error.message : 'Some error!'}))
    }
    dispatch(setAppStatusAC({status: "failed"}))

}

type thunkAPISimpleType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: thunkAPISimpleType,
                                         showError = true) => {
    if (showError) {
        thunkAPI.dispatch(errorAppStatusAC({error: error.message ? error.message : 'Some error!'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})

}

export const handleAsyncServerAppError = <T>(data: ResponseType<T>, thunkAPI: thunkAPISimpleType,
                                             showError = true) => {
    if (showError) {
        if (data.messages.length) {
            thunkAPI.dispatch(errorAppStatusAC({error: data.messages[0]}))
        } else {
            thunkAPI.dispatch(errorAppStatusAC({error: "Some error occurred"}))
        }
    }
    thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldErrors: data.fieldErrors})
}