import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../../api/tasks-api";

export default {
    title: 'Tasks_API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'e297d982-3706-4e4f-ba3f-c7d5118d47f5'
    }
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <button onClick={getTasks}>Get task</button>
    </div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTasks = () => {
        tasksAPI.createTasks(todolistId, taskTitle)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"task Title"} value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTasks}>Create task</button>
        </div>
    </div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTasks = () => {
        tasksAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTasks}>Delete task</button>
        </div>
    </div>
}

export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const updateTasks = () => {
        tasksAPI.updateTasks(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: "",
            deadline: ""
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}/>
        <input placeholder={"taskId"} value={taskId} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <input placeholder={"taskTitle"} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <input placeholder={"description"} value={description} onChange={(e) => {
            setDescription(e.currentTarget.value)
        }}/>
        <input placeholder={"status"} value={status} type={"number"} onChange={(e) => {
            setStatus(+e.currentTarget.value)
        }}/>
        <input placeholder={"priority"} value={priority} type={"number"} onChange={(e) => {
            setPriority(+e.currentTarget.value)
        }}/>
        <input placeholder={"startDate"} value={startDate} onChange={(e) => {
            setStartDate(e.currentTarget.value)
        }}/>
        <input placeholder={"deadline"} value={deadline} onChange={(e) => {
            setDeadline(e.currentTarget.value)
        }}/>
        <button onClick={updateTasks}>Update task</button>
    </div>
}

