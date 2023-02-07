import {TasksStateType} from "../../app/AppWithRedux";
import {AppActionsType} from "../App/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeTaskTitleTC, createTasksTC, fetchTasksTC, removeTasksTC, updateTaskStatusTC} from "./tasks-actions";
import {addTodolistsTC, fetchTodolistsTC, removeTodolistsTC} from "./todolists-actions";


//Types
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleusAC>

export type ActionType =
    | ChangeTaskTitleActionType
    | AppActionsType

const initialState: TasksStateType = {}

export const slice = createSlice({
    name: 'tasksReducer',
    initialState,
    reducers: {
        changeTaskTitleusAC: (state, action: PayloadAction<{ taskId: string, title: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index].title = action.payload.title
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistsTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolistsTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todos.forEach((t: any) => {
                state[t.id] = []
            })
        })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
            .addCase(createTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
            .addCase(removeTasksTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
            .addCase(updateTaskStatusTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index].status = action.payload.status
            }
        })
            .addCase(changeTaskTitleTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index].title = action.payload.title
            }
        });
    }

})

export const {changeTaskTitleusAC} = slice.actions


















