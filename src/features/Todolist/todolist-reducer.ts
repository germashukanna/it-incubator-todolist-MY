import {TodoType} from "../../api/types";
import {AppActionsType} from "../App/app-reducer";
import {RequestStatusType} from "../App";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistsTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistsTC} from "./todolists-actions";


//Types

export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>
export type ChangeTodolistEntityStatusAT = ReturnType<typeof ChangeTodolistEntityStatusAC>
const initialState: Array<TodolistDomainType> = []
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodoType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}

export type ActionType =
    ChangeTodolistFilterActionType |
    AppActionsType | ChangeTodolistEntityStatusAT


export const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        ChangeTodolistFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValueType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        ChangeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todos.map((t) => ({...t, filter: 'all', entityStatus: "idle"}))
        });
        builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > -1) {
                state.slice(index, 1);
            }
        });
        builder
            .addCase(addTodolistsTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id);
                state[index].title = action.payload.title
            });
    }
})


export const {
    ChangeTodolistFilterAC,
    ChangeTodolistEntityStatusAC
} = slice.actions




