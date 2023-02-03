import {createAsyncThunk} from "@reduxjs/toolkit";
import {tasksAPI, TaskStatuses, TasksType} from "../../api/tasks-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {AppRootStateType} from "../../app/store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {changeTaskTitleusAC} from "./tasks-reducer";
import {FieldErrorType} from "../../api/todolist-api";
import {AxiosError} from "axios";

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await tasksAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {tasks, todolistId}
})
export const removeTasksTC = createAsyncThunk('tasks/removeTasks', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await tasksAPI.deleteTasks(param.todolistId, param.taskId)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return ({taskId: param.taskId, todolistId: param.todolistId})
})
export const createTasksTC = createAsyncThunk<TasksType, { todolistId: string, title: string },
    { rejectValue: { errors: Array<string>, fieldErrors?: Array<FieldErrorType> | undefined } }>('tasks/createTasks', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await tasksAPI.createTasks(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch, false)
            return rejectWithValue({errors: res.data.messages, fieldErrors: res.data.fieldErrors})
        }
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error, dispatch, false)
        // @ts-ignore
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const updateTaskStatusTC = createAsyncThunk('tasks/updateTaskStatus', async (param: { taskId: string, todolistId: string, status: TaskStatuses }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const allTasksFromState = getState() as AppRootStateType;
    const tasksForCurrentTodolist = allTasksFromState.tasks[param.todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === param.taskId)
    if (!task) {
        return rejectWithValue('Error')
    }
    const res = await tasksAPI.updateTasks(param.todolistId, param.taskId, {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status
    })
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {taskId: param.taskId, status: param.status, todolistId: param.todolistId}
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

export const changeTaskTitleTC = createAsyncThunk('tasks/changeTaskTitle', async (param: { taskId: string, title: string, todolistId: string }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const allTasksFromState = getState() as AppRootStateType;
    const tasksForCurrentTodolist = allTasksFromState.tasks[param.todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === param.taskId)
    if (!task) {
        return rejectWithValue('Error')
    }
    const res = await tasksAPI.updateTasks(param.todolistId, param.taskId, {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status
    })
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return {taskId: param.taskId, title: param.title, todolistId: param.todolistId}
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