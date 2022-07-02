import React, {useEffect, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {FilterValueType, TodolistDomainType} from "./state/todolist-reducer";
import {TaskPriorities, TaskStatuses, TasksType} from "./api/tasks-api";
import {Todolist} from "./Components/Todolist";
import {todolistAPI} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistID1,
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1,
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low
            },

        ],
        [todolistID2]: [
            {
                id: v1(), title: 'Rest API', status: TaskStatuses.Completed, todoListId: todolistID2,
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'GraphQL', status: TaskStatuses.Completed, todoListId: todolistID2,
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low
            },
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        let todolistsTasks = tasks[todolistId]
        tasks[todolistId] = todolistsTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {
            id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistId,
            description: '', startDate: '', deadline: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low
        };
        let todolistsTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistsTasks]
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
        let todolistsTasks = tasks[todolistId]
        let task = todolistsTasks.find(task => task.id === id)
        if (task) {
            task.status = status;
            setTasks({...tasks})
        }
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        let todolistsTasks = tasks[todolistId]
        let task = todolistsTasks.find(task => task.id === id)
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }

    }
//--------------------------------------------------------------------------------------------------------//
    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(todolists => todolists.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        let todolist = todolists.find(t => t.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTasks({...tasks})
        }

    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistDomainType = {
            id: newTodolistId, title: title, filter: 'all',
            addedDate: '', order: 0
        }
        setTodolists([newTodolist, ...todolists])
        setTasks(
            {
                ...tasks, [newTodolistId]: []
            })
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

export default App;


