import React, {useCallback, useEffect} from 'react';
import {AddItemForm, AddItemFormHelperType} from "../../../Components/AddItemForm/AddItemForm";
import {EditadleSpan} from "../../../Components/EditadleSpan/EditadleSpan";
import {Task} from "./Task/Task";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TasksType} from "../../../api/types";
import {FilterValueType, TodolistDomainType} from "../todolist-reducer";
import {tasksActions, todolistsActions} from "../index";
import {useAppDispatch} from "../../../app/Hooks";
import {useActions} from "../../../utils/redux-utils";

type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TasksType>
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {
    const {ChangeTodolistFilterAC, removeTodolistsTC, changeTodolistTitleTC} = useActions(todolistsActions)
    const {fetchTasksTC} = useActions(tasksActions)
    const toCheckStatus = props.todolist.entityStatus === 'loading'
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
        ChangeTodolistFilterAC({filter: selectFilter, id: props.todolist.id})
    }, [props.todolist.id, ChangeTodolistFilterAC])

    let tasksForTodolists = props.tasks
    // if (!tasksForTodolists) {
    //     return null
    // }
    if (props.todolist.filter === "active") {
        tasksForTodolists = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolists = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    const renderFilterButton = (selectFilter: FilterValueType,
                                text: string
    ) => {

        return <Button onClick={() => onFilterButtonClickHandler(selectFilter)}
                       variant={props.todolist.filter === selectFilter ? 'outlined' : 'text'}
                       color={'inherit'}
        >{text}
        </Button>
    }

    return (
        <div style={{position: 'relative'}}>
            <IconButton onClick={removeTodolistHandler} disabled={toCheckStatus}
                        style={{position: 'absolute', right: '1px', top: '-1px'}}>
                <Delete/></IconButton>
            <h3>
                <EditadleSpan title={props.todolist.title} onChange={changeTodolistTitle}
                              disabled={props.todolist.entityStatus === 'loading'}/>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={toCheckStatus}/>

            <div>
                {tasksForTodolists && tasksForTodolists.map(t => <Task
                    key={t.id}
                    task={t}
                    todolistId={props.todolist.id}
                />)}
                {!tasksForTodolists.length &&
                    <div style={{padding: '10px', color: 'grey'}}>Create your first task)</div>}
            </div>
            <div>
                {renderFilterButton('all', 'All')}
                {renderFilterButton('active', 'Active')}
                {renderFilterButton('completed', 'Completed')}
            </div>
        </div>
    )
})



