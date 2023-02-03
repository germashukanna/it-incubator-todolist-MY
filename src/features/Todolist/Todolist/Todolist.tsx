import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditadleSpan} from "../../../Components/EditadleSpan/EditadleSpan";
import {Task} from "./Task/Task";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TasksType} from "../../../api/tasks-api";
import {FilterValueType} from "../todolist-reducer";
import {RequestStatusType} from "../../../app/app-reducer";
import {fetchTasksTC} from "../tasks-actions";
import {useActions} from "../../../app/store";
import {tasksActions, todolistsActions} from "../index";
import {useAppDispatch} from "../../../app/Hooks";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    entityStatus: RequestStatusType
    filter: FilterValueType
    id: string
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {
    const {ChangeTodolistFilterAC, removeTodolistsTC, changeTodolistTitleTC} = useActions(todolistsActions)
    const {updateTaskStatusTC, createTasksTC, fetchTasksTC} = useActions(tasksActions)
    const toCheckStatus = props.entityStatus === 'loading'
    const dispatch = useAppDispatch()

    const addTaskCallback = useCallback(async (title: string) => {
        let thunk = tasksActions.createTasksTC({title: title, todolistId: props.id})
        const resultActions = await  dispatch(thunk)
        if(tasksActions.createTasksTC.rejected.match(resultActions)){
            if(resultActions.payload?.errors?.length) {
                const errorMessage = resultActions.payload?.errors[0];
                throw new Error(errorMessage)
            } else {
                throw new Error('Some error occured')
            }
        }
    }, [props.id])

    const onFilterButtonClickHandler = useCallback((selectFilter: FilterValueType) => {
        ChangeTodolistFilterAC({filter: selectFilter, id: props.id})
    }, [props.id, ChangeTodolistFilterAC])

    const removeTodolistHandler = () => {
        removeTodolistsTC(props.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        changeTodolistTitleTC({id: props.id, title: newTitle})
    }, [props.id])
    let tasksForTodolists = props.tasks
    if (props.filter === "active") {
        tasksForTodolists = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolists = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    const renderFilterButton = (selectFilter: FilterValueType,
                                text: string
    ) => {

        return <Button onClick={() => onFilterButtonClickHandler(selectFilter)}
                       variant={props.filter === selectFilter ? 'outlined' : 'text'}
                       color={'inherit'}
        >{text}
        </Button>
    }

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        updateTaskStatusTC({taskId, todolistId, status})
    }, [])


    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasksTC(props.id)
    }, [])

    return (
        <div style={{position: 'relative'}}>
            <IconButton onClick={removeTodolistHandler} disabled={toCheckStatus}
            style={{position: 'absolute', right: '1px', top: '-1px'}}>
                <Delete/></IconButton>
            <h3>
                <EditadleSpan title={props.title} onChange={changeTodolistTitle}
                              disabled={props.entityStatus === 'loading'}/>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={toCheckStatus} />
            <ul>
                {tasksForTodolists.map(t => <Task
                    task={t}
                    changeTaskStatus={changeTaskStatus}
                    todolistId={props.id}
                    key={t.id}

                />)}
                {!tasksForTodolists.length && <div style={{padding: '10px', color: 'grey'}}>Create your first task)</div>}
            </ul>
            <div>
                {renderFilterButton('all', 'All')}
                {renderFilterButton('active', 'Active')}
                {renderFilterButton('completed', 'Completed')}
            </div>
        </div>
    )
})



