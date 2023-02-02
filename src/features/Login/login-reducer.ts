import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


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

export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {value: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldErrors})
        }
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error], fieldsErrors: undefined})
    }
})
export const logOutTC = createAsyncThunk('auth/logOut', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await authAPI.loginOut()
        if (res.data.resultCode === 0) {
            //thunkAPI.dispatch(setIsLoggedIhAC({value: false}))
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {value: false}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error.message, thunkAPI.dispatch)
    }
})

//Thunks
// export const loginTC_ = (data: LoginParamsType) => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: "loading"}))
//     authAPI.login(data)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedIhAC({value: true}))
//                 dispatch(setAppStatusAC({status: "succeeded"}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error: AxiosError) => {
//             handleServerNetworkError(error.message, dispatch)
//         })
// }
// export const logOutTC_ = () => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC({status: "loading"}))
//     authAPI.loginOut()
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedIhAC({value: false}))
//                 dispatch(setAppStatusAC({status: "succeeded"}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error: AxiosError) => {
//             handleServerNetworkError(error.message, dispatch)
//         })
// }

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIh: false
    },
    reducers: {
        setIsLoggedIhAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIh = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIh = action.payload.value;
        });
    }
})

export const loginReducer = slice.reducer;
export const {setIsLoggedIhAC} = slice.actions

// Actions
// export const setIsLoggedIhAC = (value: boolean) => {
//     return {type: 'login/SET-IS-LOGGED-IN', value} as const
// }























