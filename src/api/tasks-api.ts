import axios, {AxiosResponse} from 'axios'
import {RequestStatusType} from "../app/app-reducer";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a52700d3-7991-48d5-ac35-fcdb339c5b05',
    },
})

//api
export const tasksAPI = {
    getTasks: (todolistId: string) => {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },

    createTasks: (todolistId: string, taskTitle: string) => {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TasksType }>>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },

    deleteTasks: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTasks: (todolistId: string, taskId: string, model: UpdateTasksType) => {
        return instance.put<UpdateTasksType, AxiosResponse<ResponseType<{ item: TasksType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

}

// types
export type TasksType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
type GetTasksType = {
    items: TasksType[]
    totalCount: number
    error: string | null
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    fieldErrors?: Array<{field: string, error: string}>
    data: D
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
type UpdateTasksType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}




