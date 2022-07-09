import {todolistAPI, TodoType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppDispatch, AppThunk} from "../../app/store";
import {AppActionsType, errorAppStatusAC, setAppStatusAC} from "../../app/app-reducer";


export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOS": {
            return action.payload.todos.map((t) => ({...t, filter: "all"}))
        }
        case 'REMOVE-TODOLIST':
            return state.filter(todolists => todolists.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}

//Actions
export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const AddTodolistAC = (todolist: TodoType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
export const setTososAC = (todos: TodoType[]) => {
    return {
        type: 'SET-TODOS', payload: {
            todos
        }
    } as const
}

//Thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTososAC(res.data))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(RemoveTodolistAC(todolistId))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(AddTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    if (res.data.messages.length) {
                        dispatch(errorAppStatusAC(res.data.messages[0]))
                    } else {
                        dispatch(errorAppStatusAC("Some error occurred"))
                    }
                    dispatch(setAppStatusAC("failed"))
                }
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(ChangeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}

//Types
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>
export type setTososType = ReturnType<typeof setTososAC>

const initialState: Array<TodolistDomainType> = []
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodoType & {
    filter: FilterValueType
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType |
    setTososType | AppActionsType