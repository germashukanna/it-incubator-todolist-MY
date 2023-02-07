import {authAPI} from "../../api/todolist-api";
import {LoginParamsType} from "../../api/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../AplicationCommonActions";


export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {value: true}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const logOutTC = createAsyncThunk('auth/logOut', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await authAPI.loginOut()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {value: false}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    loginTC,
    logOutTC
}

export const slice = createSlice({
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
























