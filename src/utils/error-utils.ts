import {ResponseType} from "../api/types";
import {AxiosError} from "axios";
import {errorAppStatusAC, setAppStatusAC} from "../features/AplicationCommonActions";


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