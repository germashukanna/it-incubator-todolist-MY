import {createAsyncThunk} from "@reduxjs/toolkit";
import {TodoType} from "../../api/types";
import {todolistAPI} from "../../api/todolist-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {ChangeTodolistEntityStatusAC} from "./todolist-reducer";
import {ThunkError} from "../../utils/types";
import {setAppStatusAC} from "../AplicationCommonActions";



export const fetchTodolistsTC = createAsyncThunk<{todos: TodoType[]}, undefined, ThunkError>('todolists/fetchTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistAPI.getTodolists()
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
        return {todos: res.data}

    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const removeTodolistsTC = createAsyncThunk<{id: string}, string, ThunkError>('todolists/removeTodolists', async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    thunkAPI.dispatch(ChangeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    try {
        const res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {id: todolistId}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }

    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})
export const addTodolistsTC = createAsyncThunk<{ todolist: TodoType }, string,
    ThunkError>
('todolists/addTodolists', async (title, thunkAPI) => {
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
export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }, thunkAPI) => {
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