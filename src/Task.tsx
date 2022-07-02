import React, {ChangeEvent, useCallback} from "react";
import s from "./Components/Todolist.module.css";
import {EditadleSpan} from "./Components/EditadleSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TasksType} from "./api/tasks-api";

type TaskPropsType = {
    task: TasksType
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
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
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])
    return <li className={props.task.status === TaskStatuses.Completed ? s.isDone : ""} key={props.task.id}>
        <Checkbox color={'primary'}
                  checked={props.task.status === TaskStatuses.Completed}
                  onChange={onChangeHandler}/>
        <EditadleSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete
                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}/>
        </IconButton>
    </li>
})