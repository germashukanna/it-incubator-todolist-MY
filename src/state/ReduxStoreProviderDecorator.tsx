import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "./store";
import React from "react";
import {Provider} from "react-redux";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}</Provider>)
