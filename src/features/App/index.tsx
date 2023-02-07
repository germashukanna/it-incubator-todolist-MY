import * as appSelectors from '../../app/selectors'
import {appAsyncActions, RequestStatusType as T1, slice} from './app-reducer'




const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...actions,
    ...appAsyncActions
}

export type RequestStatusType = T1

export {
    appSelectors,
    appReducer,
    appActions,

}