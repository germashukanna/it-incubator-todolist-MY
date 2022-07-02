import React, {useReducer, useState} from 'react';
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValueType,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddItemForm} from "../Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import { Menu } from '@mui/icons-material';
import {TaskPriorities, TaskStatuses, TasksType} from "../api/tasks-api";
import {Todolist} from "../Components/Todolist";



export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReduser() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    let [tasks, setdispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistID1,
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1,
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low},


        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', status: TaskStatuses.Completed, todoListId: todolistID2,
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low},
            {id: v1(), title: 'GraphQL', status: TaskStatuses.New, todoListId: todolistID2,
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low},
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        setdispatchToTasks(removeTaskAC(id, todolistId))
    }

    const addTask = (title: string, todolistId: string) => {
        setdispatchToTasks(addTaskAC(title, todolistId))
    }

    const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
        setdispatchToTasks(changeTaskStatusAC(id, status, todolistId))
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
                                tasksForTodolists = allTodoListTasks.filter(task => task.status === TaskStatuses.New)
                            }
                            if (todolist.filter === "completed") {
                                tasksForTodolists = allTodoListTasks.filter(task => task.status === TaskStatuses.Completed)
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


