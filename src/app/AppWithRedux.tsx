import React, {useCallback, useEffect} from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {TasksType} from "../api/tasks-api";
import {TodolistsList} from "../features/Todolist/Todolist/Todolists";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./Hooks";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {initializedTC} from "./app-reducer";
import {logOutTC} from "../features/Login/login-reducer";


export type TasksStateType = {
    [key: string]: Array<TasksType>

}

function AppWithRedux() {
    const status = useAppSelector((state) => state.appReducer.status)
    const initialized = useAppSelector((state) => state.appReducer.isInitialized)
    const isLoggedIh = useAppSelector((state) => state.login.isLoggedIh)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializedTC())
    }, [])

    const onLogOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [isLoggedIh])

    if (!initialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/></div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolist
                    </Typography>
                    {isLoggedIh && <Button color={"inherit"} onClick={onLogOutHandler}>Log out</Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}


export default AppWithRedux;


