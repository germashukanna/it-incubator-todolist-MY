import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


// export const loginReducer = (state = initialState, action: ActionType): initialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN': {
//             return {
//                 ...state, isLoggedIh: action.value
//             }
//         }
//
//         default:
//             return state
//     }
// }

//Types
// export type ActionType =
//     | ReturnType<typeof setAppStatusAC>
//     | ReturnType<typeof errorAppStatusAC>


const initialState = {
    isLoggedIh: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIhAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIh = action.payload.value;
        }
    }
})

export const loginReducer = slice.reducer;
export const {setIsLoggedIhAC} = slice.actions

// Actions
// export const setIsLoggedIhAC = (value: boolean) => {
//     return {type: 'login/SET-IS-LOGGED-IN', value} as const
// }


//Thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIhAC({value: true}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    authAPI.loginOut()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIhAC({value: false}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error.message, dispatch)
        })
}




















