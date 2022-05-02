import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"
type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
        // let task = {id: v1(), title: title, isDone: true};
        // let newTask = [task, ...tasks];
        // setTasks(newTask)
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistsTasks = tasks[todolistId]
        let task = todolistsTasks.find(task => task.id === id)
        if(task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
        // let task = tasks.find(t => t.id === id)
        // if (task) {
        //     task.isDone = isDone;
        //     setTasks([...tasks])
        // }
    }

    const removeTodolist = (id: string) => {
      setTodolists(todolists.filter(todolists => todolists.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {
                    let allTodoListTasks = tasks[todolist.id]
                    let tasksForTodolists = allTodoListTasks
                    if (todolist.filter === "active") {
                        tasksForTodolists = allTodoListTasks.filter(task => task.isDone === false)
                    }
                    if (todolist.filter === "completed") {
                        tasksForTodolists = allTodoListTasks.filter(task => task.isDone === true)
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
                    />
                })}
        </div>
    );
}

export default App;
