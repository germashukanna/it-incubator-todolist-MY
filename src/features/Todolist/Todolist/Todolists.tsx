import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist";
import {useAppSelector} from "../../../app/Hooks";
import {Navigate} from "react-router-dom";
import {authSelectors} from "../../Login";
import {todolistsActions} from "../index";
import {useActions} from "../../../app/store";


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    let todolists = useAppSelector(state => state.todolists)
    let tasks = useAppSelector(state => state.tasks)
    const isLoggedIh = useAppSelector(authSelectors.selectIsLoggedIh)
    const {fetchTodolistsTC, addTodolistsTC} = useActions(todolistsActions)

    const addTodolists = useCallback(async (title: string) => {
        addTodolistsTC(title)
    }, [])

    useEffect(() => {
        fetchTodolistsTC()
    }, [])

    // const removeTask = useCallback(function (taskId: string, todolistId: string) {
    //     removeTasksTC({taskId, todolistId})
    // }, [])

    // const addTask = useCallback((title: string, todolistId: string) => {
    //     createTasksTC({todolistId, title})
    // }, [])


//--------------------------------------------------------------------------------------------------------//
//     const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
//         ChangeTodolistFilterAC({id: todolistId, filter: value})
//     }, [dispatch])

    // const removeTodolist = useCallback((id: string) => {
    //     removeTodolistsTC(id)
    // }, [dispatch])

    // const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
    //     changeTodolistTitleTC({id, title: newTitle})
    //
    // }, [dispatch])

    // const addTodolist = useCallback((title: string) => {
    //     addTodolistsTC(title)
    // }, [dispatch])


    if (!isLoggedIh) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolists}/>
            </Grid>
            <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
                {
                    todolists.map(todolist => {
                        let allTodoListTasks = tasks[todolist.id]

                        return <Grid item key={todolist.id}>
                            <Paper style={{padding: '10px', width: '300px'}}>
                                <Todolist
                                    id={todolist.id}
                                    title={todolist.title}
                                    tasks={allTodoListTasks}
                                    filter={todolist.filter}
                                    entityStatus={todolist.entityStatus}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    )

}