import React, {ChangeEvent} from 'react';
import {FilterValueType} from "../App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditadleSpan} from "./EditadleSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

export const Todolist = (props: TodolistPropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3>
                <EditadleSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                        props.removeTask(task.id, props.id)
                    }
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)

                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(task.id, newTitle, props.id)

                    }
                    return (
                        <li className={task.isDone ? s.isDone : ""} key={task.id}>
                            <Checkbox color={'primary'}
                                   checked={task.isDone}
                                   onChange={onChangeHandler}/>
                            <EditadleSpan title={task.title} onChange={onChangeTitleHandler}/>
                           <IconButton onClick={onClickHandler}>
                               <Delete style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}/>
                           </IconButton>
                        </li>
                    )
                })}
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
}


