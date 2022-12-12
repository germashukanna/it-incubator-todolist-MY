import {Dispatch} from "redux";
import {setIsLoggedIhAC} from "../features/Login/login-reducer";
import {authAPI} from "../api/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        errorAppStatusAC: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error
        },
        setAppIsInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isInitialized = action.payload.value
        },
    }
})

export const appReducer = slice.reducer;
export const {setAppStatusAC, errorAppStatusAC, setAppIsInitializedAC} = slice.actions

// export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/ERROR-STATUS':
//             return {...state, error: action.error}
//         case 'APP/SET-INITIALIZED':
//             return {...state, isInitialized: action.value}
//         default:
//             return state
//     }
// }


//Actions
//export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
//export const errorAppStatusAC = (error: null | string) => ({type: 'APP/ERROR-STATUS', error} as const)
//export const setAppIsInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)


//Thunks
export const initializedTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIhAC({value: true}))

            } else {

            }
            dispatch(setAppIsInitializedAC({value: true}))
        })
}


//Types
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof errorAppStatusAC>
    | ReturnType<typeof setAppIsInitializedAC>
    | ReturnType<typeof setIsLoggedIhAC>