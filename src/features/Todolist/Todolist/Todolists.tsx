import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm, AddItemFormHelperType} from "../../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist";
import {useAppDispatch, useAppSelector} from "../../../app/Hooks";
import {Navigate} from "react-router-dom";
import {authSelectors} from "../../Login";
import {todolistsActions} from "../index";
import {useActions} from "../../../utils/redux-utils";


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    let todolists = useAppSelector(state => state.todolists)
    let tasks = useAppSelector(state => state.tasks)
    const isLoggedIh = useAppSelector(authSelectors.selectIsLoggedIh)
    const {fetchTodolistsTC} = useActions(todolistsActions)
    const dispatch = useAppDispatch()

    const addTodolists = useCallback(async (title: string, helper: AddItemFormHelperType) => {
        let thunk = todolistsActions.addTodolistsTC(title)
        const resultActions = await dispatch(thunk)
        if (todolistsActions.addTodolistsTC.rejected.match(resultActions)) {
            if (resultActions.payload?.errors?.length) {
                const errorMessage = resultActions.payload?.errors[0];
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }

    }, [])

    useEffect(() => {
        fetchTodolistsTC()
    }, [])

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