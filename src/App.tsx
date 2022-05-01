import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
    ])

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    const [filter, setFilter] = useState<FilterValueType>("all")
    let tasksForTodolists = tasks
    if (filter === "active") {
        tasksForTodolists = tasks.filter(task => task.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolists = tasks.filter(task => task.isDone === true)
    }
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: true};
        let newTask = [task, ...tasks];
        setTasks(newTask)
    }

    return (
        <div className="App">
            <Todolist title={"Wat to learn"}
                      tasks={tasksForTodolists}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
