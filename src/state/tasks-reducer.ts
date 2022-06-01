import {TasksStateType, TodolistsType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {v1} from "uuid";


export type RemoveTASKActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string

}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


type ActionType = RemoveTASKActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType |
    RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false},
                    ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, isDone: action.isDone} : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, title: action.title} : task)

            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []

            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }

}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTASKActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleusAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}



