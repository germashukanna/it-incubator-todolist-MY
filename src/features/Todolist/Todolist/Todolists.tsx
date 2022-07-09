import {
    addTodolistsTC,
    ChangeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC,
    FilterValueType,
    removeTodolistsTC,
} from "../todolist-reducer";
import React, {useCallback, useEffect} from "react";
import {changeTaskTitleusAC, createTasksTC, removeTasksTC, updateTaskStatusTC} from "../tasks-reducer";
import {TaskStatuses} from "../../../api/tasks-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist";
import {useAppDispatch, useAppSelector} from "../../../app/Hooks";

// type TodolistsPropsType = {
//     todolist: Array<TodolistDomainType>
// }

export const TodolistsList: React.FC = (props) => {

    let todolists = useAppSelector(state => state.todolists)
    let tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTasksTC(id, todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTasksTC(todolistId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(id, todolistId, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleusAC(id, newTitle, todolistId))

    }, [dispatch])
//--------------------------------------------------------------------------------------------------------//
    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        let thunk = removeTodolistsTC(id)
        dispatch(thunk)
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(id, newTitle))

    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let thunk = addTodolistsTC(title)
        dispatch(thunk)
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    return (
        <>
            <Grid container spacing={3} style={{padding: '40px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(todolist => {
                        let allTodoListTasks = tasks[todolist.id]
                        let tasksForTodolists = allTodoListTasks

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={todolist.id}
                                    id={todolist.id}
                                    title={todolist.title}
                                    tasks={tasksForTodolists}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={todolist.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )

}