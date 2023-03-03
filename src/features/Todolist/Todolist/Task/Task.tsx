import React, {ChangeEvent, useCallback} from "react";
import s from "../Todolist.module.css";
import {EditadleSpan} from "../../../../Components/EditadleSpan/EditadleSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TasksType} from "../../../../api/types";
import {tasksActions} from "../../index";
import {useActions} from "../../../../utils/redux-utils";


type TaskPropsType = {
    task: TasksType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const {removeTasksTC, updateTaskTC} = useActions(tasksActions)

    const onClickHandler = () => {
        removeTasksTC({taskId: props.task.id, todolistId: props.todolistId})
    }

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTaskTC({
            taskId: props.task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId
        })
    }, [props.task.id, props.todolistId])

    const onChangeTitleHandler =  useCallback((newValue: string) => {
        updateTaskTC({
            taskId: props.task.id,
            model: {title: newValue},
            todolistId: props.todolistId
        })
    }, [props.task.id, props.todolistId])

    return <div className={props.task.status === TaskStatuses.Completed ? s.isDone : ""} key={props.task.id}
               style={{position: 'relative'}}>
        <Checkbox color={'secondary'}
                  checked={props.task.status === TaskStatuses.Completed}
                  onChange={onChangeHandler}/>
        <EditadleSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler} style={{position: 'absolute', top: '2px', right: '2px'}}>
            <Delete
                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}/>
        </IconButton>
    </div>
})