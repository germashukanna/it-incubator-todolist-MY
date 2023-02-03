import {errorAppStatusAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ActionType} from "../features/Todolist/tasks-reducer";
import {ResponseType} from "../api/tasks-api";


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


export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<ActionType>,
                                         showError = true) => {
    if (showError) {
        dispatch(errorAppStatusAC({error: error.message ? error.message : 'Some error!'}))
    }
    dispatch(setAppStatusAC({status: "failed"}))

}