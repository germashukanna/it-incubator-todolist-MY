import {createAsyncThunk} from "@reduxjs/toolkit";
import {tasksAPI, TaskStatuses, TasksType} from "../../api/tasks-api";
import {appActions} from "../../app";
import {AppRootStateType, ThunkError} from "../../app/store";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/error-utils";

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: "loading"}))
    const res = await tasksAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(appActions.setAppStatusAC({status: "succeeded"}))
    return {tasks, todolistId}
})
export const removeTasksTC = createAsyncThunk('tasks/removeTasks', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: "loading"}))
    const res = await tasksAPI.deleteTasks(param.todolistId, param.taskId)
    thunkAPI.dispatch(appActions.setAppStatusAC({status: "succeeded"}))
    return ({taskId: param.taskId, todolistId: param.todolistId})
})
export const createTasksTC = createAsyncThunk<TasksType, { todolistId: string, title: string },
    ThunkError>('tasks/createTasks', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: "loading"}))
    try {
        const res = await tasksAPI.createTasks(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI, true)
    }
})
export const updateTaskStatusTC = createAsyncThunk('tasks/updateTaskStatus', async (param: { taskId: string, todolistId: string, status: TaskStatuses }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    dispatch(appActions.setAppStatusAC({status: "loading"}))
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
            dispatch(appActions.setAppStatusAC({status: "succeeded"}))
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

export const changeTaskTitleTC = createAsyncThunk('tasks/changeTaskTitle', async (param: { taskId: string, title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: "loading"}))
    const allTasksFromState = thunkAPI.getState() as AppRootStateType;
    const tasksForCurrentTodolist = allTasksFromState.tasks[param.todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('Error')
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
            thunkAPI.dispatch(appActions.setAppStatusAC({status: "succeeded"}))
            return {taskId: param.taskId, title: param.title, todolistId: param.todolistId}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI, true)
    }
})