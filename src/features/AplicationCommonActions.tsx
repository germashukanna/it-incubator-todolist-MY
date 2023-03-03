import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "./App/app-reducer";


export const setAppStatusAC = createAction<{ status: RequestStatusType }>('app/setAppStatusAC')

export const errorAppStatusAC = createAction<{ error: string | null }>('app/errorAppStatusAC')