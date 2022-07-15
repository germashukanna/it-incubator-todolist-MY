import {Dispatch} from "redux";
import {ActionType, setIsLoggedIhAC} from "../features/Login/login-reducer";
import {authAPI} from "../api/todolist-api";


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
    isInitialized: false
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
export const initializedTC = () => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIhAC(true))

            } else {

            }
            dispatch(setAppIsInitializedAC(true))
        })
}


//Types
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof errorAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
    | ReturnType<typeof setIsLoggedIhAC>