import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";

export type FilterValueType = "all" | "active" | "completed"

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        let todolistsTasks = tasks[todolistId]
        tasks[todolistId] = todolistsTasks.filter(task => task.id !== id)
        setTasks({...tasks})
        // let filteredTasks = tasks.filter(task => task.id !== id)
        // setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: true};
        let todolistsTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistsTasks]
        setTasks({...tasks})
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
         let todolist = todolists.find(t => t.id === id)
        if (todolist) {
            todolist.title = newTitle;
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
    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistsTasks = tasks[todolistId]
        let task = todolistsTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(todolists => todolists.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks(
            {
                ...tasks, [newTodolistId]: []
            })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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

                    return <Todolist
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
                })}
        </div>
    );
}

export default App;


