import {AppRootStateType} from "./store";


export const selectStatus = (state: AppRootStateType) => state.appReducer.status
export const selectInitialized = (state: AppRootStateType) => state.appReducer.isInitialized