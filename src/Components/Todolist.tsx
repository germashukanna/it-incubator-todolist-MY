import React, {useCallback} from 'react';
import {FilterValueType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditadleSpan} from "./EditadleSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "../Task";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    id: string
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: TodolistPropsType) => {

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
        tasksForTodolists = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolists = props.tasks.filter(task => task.isDone)
    }

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


