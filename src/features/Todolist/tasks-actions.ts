import {createAsyncThunk} from "@reduxjs/toolkit";
import {tasksAPI} from "../../api/tasks-api";
import {TaskPriorities, TaskStatuses, TasksType, UpdateTasksType} from "../../api/types";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {AppRootStateType, ThunkError} from "../../utils/types";
import { setAppStatusAC } from "../AplicationCommonActions";

export const fetchTasksTC = createAsyncThunk<{tasks: TasksType[], todolistId: string}, string, ThunkError>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await tasksAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {tasks, todolistId}
})
export const removeTasksTC = createAsyncThunk<{taskId: string, todolistId: string}, { taskId: string, todolistId: string }, ThunkError>('tasks/removeTasks', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await tasksAPI.deleteTasks(param.todolistId, param.taskId)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return ({taskId: param.taskId, todolistId: param.todolistId})
})
export const createTasksTC = createAsyncThunk<TasksType, { todolistId: string, title: string },
    ThunkError>('tasks/createTasks', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await tasksAPI.createTasks(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI, true)
    }
})
// export const updateTaskStatusTC = createAsyncThunk('tasks/updateTaskStatus', async (param: { taskId: string, todolistId: string, status: TaskStatuses }, thunkAPI) => {
//     thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
//     const allTasksFromState = thunkAPI.getState() as AppRootStateType;
//     const tasksForCurrentTodolist = allTasksFromState.tasks[param.todolistId]
//     const task = tasksForCurrentTodolist.find(t => t.id === param.taskId)
//     if (!task) {
//         return thunkAPI.rejectWithValue('Error')
//     }
//     const res = await tasksAPI.updateTasks(param.todolistId, param.taskId, {
//         title: task.title,
//         startDate: task.startDate,
//         priority: task.priority,
//         description: task.description,
//         deadline: task.deadline,
//         status: task.status
//     })
//     try {
//         if (res.data.resultCode === 0) {
//             thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
//             return {taskId: param.taskId, status: param.status, todolistId: param.todolistId}
//         } else {
//             return handleAsyncServerAppError(res.data, thunkAPI)
//         }
//     } catch (error) {
//         // @ts-ignore
//         return handleAsyncServerNetworkError(error, thunkAPI, true)
//     }
// })
//
// export const changeTaskTitleTC = createAsyncThunk('tasks/changeTaskTitle', async (param: { taskId: string, title: string, todolistId: string }, thunkAPI) => {
//     thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
//     const allTasksFromState = thunkAPI.getState() as AppRootStateType;
//     const tasksForCurrentTodolist = allTasksFromState.tasks[param.todolistId]
//     const task = tasksForCurrentTodolist.find(t => t.id === param.taskId)
//     if (!task) {
//         return thunkAPI.rejectWithValue('Error')
//     }
//     const res = await tasksAPI.updateTasks(param.todolistId, param.taskId, {
//         title: task.title,
//         startDate: task.startDate,
//         priority: task.priority,
//         description: task.description,
//         deadline: task.deadline,
//         status: task.status
//     })
//     try {
//         if (res.data.resultCode === 0) {
//             thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
//             return {taskId: param.taskId, title: param.title, todolistId: param.todolistId}
//         } else {
//             return handleAsyncServerAppError(res.data, thunkAPI)
//         }
//     } catch (error) {
//         // @ts-ignore
//         return handleAsyncServerNetworkError(error, thunkAPI, true)
//     }
// })

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, todolistId: string, model: UpdateDomainTaskModelType }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTasksType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }
    const res = await tasksAPI.updateTasks(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        // @ts-ignore
        return handleAsyncServerNetworkError(error, thunkAPI, true)
    }
})

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}