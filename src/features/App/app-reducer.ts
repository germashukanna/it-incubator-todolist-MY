import {authActions} from "../Login";
import {authAPI} from "../../api/todolist-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {errorAppStatusAC, setAppStatusAC} from "../AplicationCommonActions";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// enum RequestStatusTypeEnum{
//     IDLE = 'idle',
//     LOADING = 'loading',
//     FAILED = 'failed',
//     SUCCEEDED = 'succeeded'
// }

export const initializedTC = createAsyncThunk('app/initialized', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(authActions.setIsLoggedIhAC({value: true}))

    } else {
    }
    return {value: true}
})

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as null | string,
        isInitialized: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializedTC.fulfilled, (state, action) => {
                state.isInitialized = action.payload.value
            })
            .addCase(setAppStatusAC, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(errorAppStatusAC, (state, action) => {
                state.error = action.payload.error
            })
    }
})

export const appAsyncActions = {
    initializedTC
}
//Types
export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof errorAppStatusAC>
