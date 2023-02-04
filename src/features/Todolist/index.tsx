import * as tasksActions from './tasks-actions'
import * as todolistsAsyncActions from './todolists-actions'
import {slice as TodolistsListSlice} from "./todolist-reducer";
import {slice as tasksSlice} from "./tasks-reducer";
import {TodolistsList} from './Todolist/Todolists'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...TodolistsListSlice.actions
}

const todolistsReducer = TodolistsListSlice.reducer
const tasksReducer = tasksSlice.reducer


export {
    tasksActions,
    todolistsActions,
    TodolistsList,
    todolistsReducer,
    tasksReducer
}