import React, {useCallback, useEffect} from 'react';
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./Components/AddItemForm";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleusAC,
    createTasksTC,
    removeTaskAC,
    removeTasksTC, updateTaskStatusTC
} from "./state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, fetchTodolistsTC, FilterValueType,
    RemoveTodolistAC,
    TodolistDomainType
} from "./state/todolist-reducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {TaskStatuses, TasksType} from "./api/tasks-api";
import {Todolist} from "./Components/Todolist";


export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
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
        let action = RemoveTodolistAC(id)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(id, newTitle))

    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)

    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolist
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                        })}
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;


