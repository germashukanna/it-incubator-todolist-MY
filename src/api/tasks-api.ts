import axios, {AxiosResponse} from 'axios'
import {GetTasksType, TasksType, UpdateTasksType, ResponseType} from "./types";


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







