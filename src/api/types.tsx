import {RequestStatusType} from "../features/App/app-reducer";

// types Tasks
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
export type GetTasksType = {
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
export type UpdateTasksType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

// types Tasks
export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type FieldErrorType = {field: string, error: string}
export type BaseResponseType<a = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: Array<FieldErrorType>
    data: a
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}