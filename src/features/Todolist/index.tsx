import * as tasksActions from './tasks-actions'
import * as todolistsAsyncActions from './todolists-actions'
import {slice} from "./todolist-reducer";
import {TodolistsList} from './Todolist/Todolists'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

export {
    tasksActions,
    todolistsActions,
    TodolistsList
}