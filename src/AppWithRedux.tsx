import React, {useCallback} from 'react';
// import './App.css';
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksType, Todolist} from "./Components/Todolist";
import {AddItemForm} from "./Components/AddItemForm";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleusAC, removeTaskAC} from "./state/tasks-reducer";
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolist-reducer";


export type FilterValueType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
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
                <Grid container spacing={3} style={{padding: '20px'}}>
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


