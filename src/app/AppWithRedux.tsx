import React from 'react';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {TasksType} from "../api/tasks-api";
import {TodolistsList} from "../features/Todolist/Todolist/Todolists";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {useAppSelector} from "./Hooks";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";



export type TasksStateType = {
    [key: string]: Array<TasksType>

}

function AppWithRedux() {
 const status = useAppSelector((state)=> state.appReducer.status )

    return (
        <BrowserRouter>
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
                    <Button color={"inherit"}>Login</Button>
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
        </BrowserRouter>
    );
}



export default AppWithRedux;


