import * as authSelectors from './selectors'
import {Login} from './Login'
import {asyncActions, slice} from "./login-reducer";

const authActions = {
    ...asyncActions,
    ...slice.actions
}

const loginReducer = slice.reducer

export {
    authSelectors,
    Login,
    authActions,
    loginReducer
}