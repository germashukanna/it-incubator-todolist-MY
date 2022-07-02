import {v1} from "uuid";
import {todolistAPI, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

export type setTososType = ReturnType<typeof setTososAC>

const initialState: Array<TodolistDomainType> = []
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodoType & {
    filter: FilterValueType
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType |
    setTososType

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS": {
            return action.payload.todos.map((t) => ({...t, filter: "all"}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(todolists => todolists.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId, title: action.title,
                filter: 'all', addedDate: '', order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        default:
            return state
    }

}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

export const setTososAC = (todos: TodoType[]) => {
    return {
        type: 'SET-TODOS', payload: {
            todos
        }
    } as const
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTososAC(res.data))
            })
    }}

