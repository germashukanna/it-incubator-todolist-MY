import {Dispatch} from "redux";
import {tasksAPI} from "../api/tasks-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {ActionType, addTaskAC} from "../features/Todolist/tasks-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// enum RequestStatusTypeEnum{
//     IDLE = 'idle',
//     LOADING = 'loading',
//     FAILED = 'failed',
//     SUCCEEDED = 'succeeded'
// }


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: true
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/ERROR-STATUS':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}


//Actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const errorAppStatusAC = (error: null | string) => ({type: 'APP/ERROR-STATUS', error} as const)
export const setAppIsInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)


//Thunks
// export const шnitializedTC = () => (dispatch: Dispatch<ActionType>) => {
//     dispatch(setAppStatusAC("loading"))
//     tasksAPI.createTasks(todolistId, title)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 const action = addTaskAC(res.data.data.item)
//                 dispatch(action)
//                 dispatch(setAppStatusAC("succeeded"))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error: AxiosError) => {
//             handleServerNetworkError(error.message, dispatch)
//         })
// }


//Types
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof errorAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>