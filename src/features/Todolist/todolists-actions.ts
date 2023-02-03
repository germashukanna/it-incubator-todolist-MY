import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {todolistAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {ChangeTodolistEntityStatusAC} from "./todolist-reducer";

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
        handleServerNetworkError(error.message, dispatch)
        dispatch(ChangeTodolistEntityStatusAC({id: todolistId, entityStatus: 'idle'}))
        return rejectWithValue(null)
    }
})
export const addTodolistsTC = createAsyncThunk('tasks/addTodolists', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error.message, dispatch)
        return rejectWithValue(null)
    }
})
export const changeTodolistTitleTC = createAsyncThunk('tasks/changeTodolistTitle', async (param: { id: string, title: string }, {
    dispatch
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistAPI.updateTodolist(param.id, param.title)
    dispatch(setAppStatusAC({status: "succeeded"}))
    return {id: param.id, title: param.title}
})