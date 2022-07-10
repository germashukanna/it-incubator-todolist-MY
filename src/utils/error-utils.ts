import {errorAppStatusAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ActionType} from "../features/Todolist/tasks-reducer";
import {ResponseType} from "../api/tasks-api";



export const handleServerAppError  = <T>(data: ResponseType<T>, dispatch: Dispatch<ActionType>) => {
    if (data.messages.length) {
        dispatch(errorAppStatusAC(data.messages[0]))
    } else {
        dispatch(errorAppStatusAC("Some error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}


export const handleServerNetworkError = (message: string, dispatch: Dispatch<ActionType>) => {
    dispatch(errorAppStatusAC(message))
    dispatch(setAppStatusAC("failed"))

}