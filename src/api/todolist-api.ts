import axios, {AxiosResponse} from 'axios'
import {LoginParamsType, ResponseType, TodoType, BaseResponseType} from "./types";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a52700d3-7991-48d5-ac35-fcdb339c5b05',
    },
})

//api
export const todolistAPI = {
    getTodolists: () => {
        return instance.get<TodoType[]>('todo-lists')
    },

    createTodolist: (title: string) => {
        return instance.post<ResponseType<{ item: TodoType }>>('todo-lists', {title})
    },

    deleteTodolist: (id: string) => {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },

    updateTodolist: (todolistId: string, title: string) => {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
}

export const authAPI = {
    login: (data: LoginParamsType) => {
        return instance.post<ResponseType<{userId?: number}>>('auth/login', data)
    },
    loginOut: () => {
        return instance.delete<ResponseType<{userId?: number}>>('auth/login');
    },
    me: () => {
        return instance.get<ResponseType<{id: number; email: string; login: string}>>('auth/me');
    }
}





