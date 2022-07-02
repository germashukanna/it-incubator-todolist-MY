import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a52700d3-7991-48d5-ac35-fcdb339c5b05',
    },
})

export const tasksAPI = {
    getTasks: (todolistId: string) => {
        return instance.get<GetTasksType[]>(`todo-lists/${todolistId}/tasks`)
    },

    createTasks: (todolistId: string, taskTitle: string) => {
        return instance.post<CreateTasksType[]>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },

    deleteTasks: (todolistId: string, taskId: string) => {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTasks: (todolistId: string, taskId: string, model: UpdateTasksType) => {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

}


type GetTasksType = {
    items: TasksType[]
    totalCount: number
    error: string | null
}

type CreateTasksType = {
    items: TasksType[]
    resultCode: number
    messages: string
}

type ResponseType<D> = {
    resultCode: number
    messages: string[],
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
}

type UpdateTasksType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}




