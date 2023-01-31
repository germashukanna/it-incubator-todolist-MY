import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";
import {AppRootStateType, RootReducerType} from "../../app/store";
import React from "react";
import {Provider} from "react-redux";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";
import {appReducer} from "../../app/app-reducer";
import thunk from "redux-thunk";
import {loginReducer} from "../Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";



const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    appReducer: appReducer,
    login: loginReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"
            }
        ]
    },
    appReducer: {
        error: null,
        status: 'succeeded',
        isInitialized: true
    },
    login: {
        isLoggedIh: true
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <HashRouter>{storyFn()}</HashRouter>)


