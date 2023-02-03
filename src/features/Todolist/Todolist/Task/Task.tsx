import React, {ChangeEvent, useCallback} from "react";
import s from "../Todolist.module.css";
import {EditadleSpan} from "../../../../Components/EditadleSpan/EditadleSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TasksType} from "../../../../api/tasks-api";
import {useActions} from "../../../../app/store";
import {tasksActions} from "../../index";

type TaskPropsType = {
    task: TasksType
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const {removeTasksTC, changeTaskTitleTC} = useActions(tasksActions)

    const onClickHandler = () => {
        removeTasksTC({taskId: props.task.id, todolistId: props.todolistId})
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitleTC({taskId: props.task.id, title: newTitle, todolistId: props.todolistId})
    }, [props.task.id, props.todolistId])
    return <li className={props.task.status === TaskStatuses.Completed ? s.isDone : ""} key={props.task.id} style={{position: 'relative'}}>
        <Checkbox color={'secondary'}
                  checked={props.task.status === TaskStatuses.Completed}
                  onChange={onChangeHandler}/>
        <EditadleSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler} style={{position: 'absolute', top: '2px', right: '2px'}}>
            <Delete
                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}/>
        </IconButton>
    </li>
})