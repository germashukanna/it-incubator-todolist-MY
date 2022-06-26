import React, {useReducer, useState} from 'react';
// import './App.css';
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddItemForm} from "../Components/AddItemForm";
import {TasksType, Todolist} from "../Components/Todolist";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import { Menu } from '@mui/icons-material';


export type FilterValueType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReduser() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setdispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false},
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        setdispatchToTasks(removeTaskAC(id, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        setdispatchToTasks(addTaskAC(title, todolistId))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        setdispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
        }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        setdispatchToTasks(changeTaskTitleusAC(id, newTitle, todolistId))

    }
//--------------------------------------------------------------------------------------------------------//
    const changeFilter = (value: FilterValueType, todolistId: string) => {
        dispatchToTodolists(ChangeTodolistFilterAC(todolistId, value))
    }

    const removeTodolist = (id: string) => {
        let action = RemoveTodolistAC(id)
        dispatchToTodolists(action)
        setdispatchToTasks(action)

    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatchToTodolists(ChangeTodolistTitleAC(id, newTitle))

    }

    const addTodolist = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchToTodolists(action)
        setdispatchToTasks(action)
    }

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
                            if (todolist.filter === "active") {
                                tasksForTodolists = allTodoListTasks.filter(task => !task.isDone)
                            }
                            if (todolist.filter === "completed") {
                                tasksForTodolists = allTodoListTasks.filter(task => task.isDone)
                            }

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

export default AppWithReduser;


