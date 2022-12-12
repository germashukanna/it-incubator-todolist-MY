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
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    let todolists = useAppSelector(state => state.todolists)
    let tasks = useAppSelector(state => state.tasks)
    const isLoggedIh = useAppSelector((state) => state.login.isLoggedIh)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIh) {
            return;
        }
        dispatch(fetchTodolistsTC())
    }, [])

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
        dispatch(changeTaskTitleusAC({taskId: id, title: newTitle, todolistId}))

    }, [dispatch])
//--------------------------------------------------------------------------------------------------------//
    const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC({id: todolistId, filter: value}))
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


    if (!isLoggedIh) {
        return <Navigate to={'/login'}/>
    }

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
                                    entityStatus={todolist.entityStatus}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )

}