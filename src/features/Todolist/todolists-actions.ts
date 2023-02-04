import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {todolistAPI, TodoType} from "../../api/todolist-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/error-utils";
import {ChangeTodolistEntityStatusAC} from "./todolist-reducer";
import {ThunkError} from "../../app/store";

export const fetchTodolistsTC = createAsyncThunk('tasks/fetchTodolists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {todos: res.data}

    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error.message, dispatch)
        return rejectWithValue(null)
    }
})
export const removeTodolistsTC = createAsyncThunk('tasks/removeTodolists', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(ChangeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    try {
        const res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {id: todolistId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }

    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})
export const addTodolistsTC = createAsyncThunk<{ todolist: TodoType }, string,
    ThunkError>
('tasks/addTodolists', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})
export const changeTodolistTitleTC = createAsyncThunk('tasks/changeTodolistTitle', async (param: { id: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {id: param.id, title: param.title}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI, true)
    }
})