import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e297d982-3706-4e4f-ba3f-c7d5118d47f5',
    },
})

export const todolistAPI = {
    getTodolists: () => {
        return instance.get<TodoType[]>('todo-lists')
    },

    createTodolist: (title: string) => {
        return instance.post<BaseResponseType<{ item: TodoType }>>('todo-lists', {title})
    },

    deleteTodolist: (todolistId: string) => {
        return instance.delete<BaseResponseType<{}>>(`todo-lists/${todolistId}`)
    },

    updateTodolist: (todolistId: string, title: string) => {
        return instance.put<BaseResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    },

}


type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<a> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: a
}


