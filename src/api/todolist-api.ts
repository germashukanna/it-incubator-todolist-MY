import axios, {AxiosResponse} from 'axios'
import {ResponseType} from "./tasks-api";


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
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodoType }>>>('todo-lists', {title})
    },

    deleteTodolist: (todolistId: string) => {
        return instance.delete<BaseResponseType<{}>>(`todo-lists/${todolistId}`)
    },

    updateTodolist: (todolistId: string, title: string) => {
        return instance.put<{ title: string }, AxiosResponse<BaseResponseType>>(`todo-lists/${todolistId}`, {title: title})
    },
}

export const authAPI = {
    login: (data: LoginParamsType) => {
        return instance.post<{data: LoginParamsType}, AxiosResponse<ResponseType<{ userId?: number }>>>('auth/login', {data})
    }
}


// types
export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type BaseResponseType<a = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: a
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}


