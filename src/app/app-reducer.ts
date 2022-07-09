export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// enum RequestStatusTypeEnum{
//     IDLE = 'idle',
//     LOADING = 'loading',
//     FAILED = 'failed',
//     SUCCEEDED = 'succeeded'
// }


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'ERROR-STATUS':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const errorAppStatusAC = (error: null | string) => ({type: 'ERROR-STATUS', error} as const)

export type AppActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof errorAppStatusAC>