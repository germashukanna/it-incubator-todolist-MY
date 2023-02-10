import React, {useCallback, useEffect} from 'react';
import {AddItemForm, AddItemFormHelperType} from "../../../Components/AddItemForm/AddItemForm";
import {EditadleSpan} from "../../../Components/EditadleSpan/EditadleSpan";
import {Task} from "./Task/Task";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TasksType} from "../../../api/types";
import {FilterValueType, TodolistDomainType} from "../todolist-reducer";
import {RequestStatusType} from "../../App/app-reducer";
import {tasksActions, todolistsActions} from "../index";
import {useAppDispatch} from "../../../app/Hooks";
import {useActions} from "../../../utils/redux-utils";

type TodolistPropsType = {
    title: string
    todolist: TodolistDomainType
    tasks: Array<TasksType>
    entityStatus: RequestStatusType
    filter: FilterValueType
    id: string
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {
    const {ChangeTodolistFilterAC, removeTodolistsTC, changeTodolistTitleTC} = useActions(todolistsActions)
    const {updateTaskStatusTC, fetchTasksTC} = useActions(tasksActions)
    const toCheckStatus = props.entityStatus === 'loading'
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        if (!props.tasks.length) {
            fetchTasksTC(props.todolist.id)
        }
    }, [])

    const addTaskCallback = useCallback(async (title: string, helper: AddItemFormHelperType) => {
        let thunk = tasksActions.createTasksTC({title: title, todolistId: props.todolist.id})
        const resultActions = await dispatch(thunk)
        if (tasksActions.createTasksTC.rejected.match(resultActions)) {
            if (resultActions.payload?.errors?.length) {
                const errorMessage = resultActions.payload?.errors[0];
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }
    }, [props.todolist.id])

    const removeTodolistHandler = () => {
        removeTodolistsTC(props.todolist.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: newTitle})
    }, [props.todolist.id])

    const onFilterButtonClickHandler = useCallback((selectFilter: FilterValueType) => {
        ChangeTodolistFilterAC({filter: selectFilter, id: props.id})
    }, [props.id, ChangeTodolistFilterAC])

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


    return (
        <div style={{position: 'relative'}}>
            <IconButton onClick={removeTodolistHandler} disabled={toCheckStatus}
                        style={{position: 'absolute', right: '1px', top: '-1px'}}>
                <Delete/></IconButton>
            <h3>
                <EditadleSpan title={props.title} onChange={changeTodolistTitle}
                              disabled={props.entityStatus === 'loading'}/>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={toCheckStatus}/>
            <ul>
                {tasksForTodolists.map(t => <Task
                    task={t}
                    changeTaskStatus={changeTaskStatus}
                    todolistId={props.todolist.id}
                    key={t.id}

                />)}
                {!tasksForTodolists.length &&
                    <div style={{padding: '10px', color: 'grey'}}>Create your first task)</div>}
            </ul>
            <div>
                {renderFilterButton('all', 'All')}
                {renderFilterButton('active', 'Active')}
                {renderFilterButton('completed', 'Completed')}
            </div>
        </div>
    )
})



