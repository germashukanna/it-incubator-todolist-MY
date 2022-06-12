import React, {ChangeEvent, useCallback} from "react";
import s from "./Components/Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditadleSpan} from "./Components/EditadleSpan";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./Components/Todolist";

type TaskPropsType = {
    task: TasksType
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    }

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])
    return <li className={props.task.isDone ? s.isDone : ""} key={props.task.id}>
        <Checkbox color={'primary'}
                  checked={props.task.isDone}
                  onChange={onChangeHandler}/>
        <EditadleSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete
                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}/>
        </IconButton>
    </li>
})