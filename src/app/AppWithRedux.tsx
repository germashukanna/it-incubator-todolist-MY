import React from 'react';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {TasksType} from "../api/tasks-api";
import {TodolistsList} from "../features/Todolist/Todolist/Todolists";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {useAppSelector} from "./Hooks";


export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {
 const status = useAppSelector((state)=> state.appReducer.status )

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
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}



export default AppWithRedux;


