import {todolistAPI, TodoType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


//Types
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>
export type setTososType = ReturnType<typeof setTososAC>
export type ChangeTodolistEntityStatusAT = ReturnType<typeof ChangeTodolistEntityStatusAC>

const initialState: Array<TodolistDomainType> = []
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodoType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType |
    setTososType | AppActionsType | ChangeTodolistEntityStatusAT

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        RemoveTodolistAC: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.slice(index, 1);
            }
        },
        AddTodolistAC: (state, action: PayloadAction<{ todolist: TodoType }>) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        ChangeTodolistTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title
        },
        ChangeTodolistFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValueType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        setTososAC: (state, action: PayloadAction<{ todos: TodoType[] }>) => {
            return action.payload.todos.map((t) => ({...t, filter: 'all', entityStatus: "idle"}))
        },
        ChangeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.entityStatus
        },

    }
})

// export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case "SET-TODOS": {
//             return action.payload.todos.map((t) => ({...t, filter: "all", entityStatus: "idle"}))
//         }
//         case 'REMOVE-TODOLIST':
//             return state.filter(todolists => todolists.id !== action.id)
//         case 'ADD-TODOLIST':
//             return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         case 'SET-TODOLIST-ENTITY-STATUS':
//             return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
//         default:
//             return state
//     }
// }


export const todolistsReducer = slice.reducer;
export const {
    RemoveTodolistAC, AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, setTososAC, ChangeTodolistEntityStatusAC
} = slice.actions

//Actions
// export const RemoveTodolistAC = (todolistId: string) => {
//     return {type: 'REMOVE-TODOLIST', id: todolistId} as const
// }
// export const AddTodolistAC = (todolist: TodoType) => {
//     return {type: 'ADD-TODOLIST', todolist} as const
// }
// export const ChangeTodolistTitleAC = (id: string, title: string) => {
//     return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
// }
// export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType) => {
//     return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
// }
// export const setTososAC = (todos: TodoType[]) => {
//     return {
//         type: 'SET-TODOS', payload: {
//             todos
//         }
//     } as const
// }
// export const ChangeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
//     return {type: 'SET-TODOLIST-ENTITY-STATUS', id, entityStatus} as const
// }

//Thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTososAC({todos: res.data}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
}

export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(ChangeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(RemoveTodolistAC({id: todolistId}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error.message, dispatch)
                dispatch(ChangeTodolistEntityStatusAC({id: todolistId, entityStatus: 'idle'}))
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(AddTodolistAC({todolist: res.data.data.item}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error.message, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: "idle"}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(ChangeTodolistTitleAC({id: id, title}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}

