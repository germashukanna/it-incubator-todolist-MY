import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditadleSpan} from "../../../Components/EditadleSpan/EditadleSpan";
import {Task} from "./Task/Task";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TasksType} from "../../../api/tasks-api";
import {FilterValueType} from "../todolist-reducer";
import {fetchTasksTC} from "../tasks-reducer";
import {useDispatch} from "react-redux";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    filter: FilterValueType
    id: string
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.id, props.changeFilter])
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])
    let tasksForTodolists = props.tasks
    if (props.filter === "active") {
        tasksForTodolists = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolists = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))

    }, [])

    return (
        <div>
            <h3>
                <EditadleSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksForTodolists.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={t.id}
                />)}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={props.filter === "active" ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'inherit'}
                >Active
                </Button>
                <Button variant={props.filter === "completed" ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'inherit'}
                >Completed
                </Button>
            </div>
        </div>
    )
})


