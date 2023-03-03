import {AppRootStateType} from "../utils/types";


export const selectStatus = (state: AppRootStateType) => state.appReducer.status
export const selectInitialized = (state: AppRootStateType) => state.appReducer.isInitialized