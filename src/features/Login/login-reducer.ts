import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {errorAppStatusAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";


const initialState: initialStateType = {
    isLoggedIh: false
}

export const loginReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            return {
                ...state, isLoggedIh: action.value
            }
        }

        default:
            return state
    }
}

// Actions
export const setIsLoggedIhAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}


//Thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIhAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error.message, dispatch)
        })
}


//Types
export type ActionType = ReturnType<typeof setIsLoggedIhAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof errorAppStatusAC>

type initialStateType = {
    isLoggedIh: boolean
}















