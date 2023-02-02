import {addTodolistsTC, fetchTodolistsTC, removeTodolistsTC} from "./todolist-reducer";
import {tasksAPI, TaskStatuses} from "../../api/tasks-api";
import {AppRootStateType} from "../../app/store";
import {TasksStateType} from "../../app/AppWithRedux";
import {AppActionsType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


//Types
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleusAC>

export type ActionType =
// | addTaskType
    | ChangeTaskTitleActionType
    | AppActionsType

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await tasksAPI.getTasks(todolistId)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {tasks, todolistId}
})
export const removeTasksTC = createAsyncThunk('tasks/removeTasks', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await tasksAPI.deleteTasks(param.todolistId, param.taskId)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return ({taskId: param.taskId, todolistId: param.todolistId})
})
// export const createTasksTC = createAsyncThunk('tasks/createTasks', async (param: { todolistId: string, title: string }, thunkAPI) => {
//     thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
//     const res = await tasksAPI.createTasks(param.todolistId, param.title)
//     thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
//     return res.data.data.item
// })
export const createTasksTC = createAsyncThunk('tasks/createTasks', async (param: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await tasksAPI.createTasks(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        // @ts-ignore
        handleServerNetworkError(error.message, thunkAPI.dispatch)
        return rejectWithValue(null)
    }
})
export const updateTaskStatusTC = createAsyncThunk('tasks/updateTaskStatus', async (param: { taskId: string, todolistId: string, status: TaskStatuses }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const allTasksFromState = getState() as AppRootStateType;
    const tasksForCurrentTodolist = allTasksFromState.tasks[param.todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === param.taskId)
    if (!task) {
        return rejectWithValue('Error')
        }
        const res = await tasksAPI.updateTasks(param.todolistId, param.taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        })
        try {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: "succeeded"}))
                return {taskId: param.taskId, status: param.status, todolistId: param.todolistId}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            // @ts-ignore
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue(null)
        }
})

//Thunks
// export const _fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
//     dispatch(setAppStatusAC({status: "loading"}))
//     tasksAPI.getTasks(todolistId)
//         .then((res) => {
//             const tasks = res.data.items
//             const action = setTasksAC({tasks, todolistId})
//             dispatch(action)
//             dispatch(setAppStatusAC({status: "succeeded"}))
//         })
// }
// export const createTasksTC_ = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
//     dispatch(setAppStatusAC({status: "loading"}))
//     tasksAPI.createTasks(todolistId, title)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 const action = addTaskAC({task: res.data.data.item})
//                 dispatch(action)
//                 dispatch(setAppStatusAC({status: "succeeded"}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error: AxiosError) => {
//             handleServerNetworkError(error.message, dispatch)
//         })
// }
// export const removeTasksTC_ = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
//     dispatch(setAppStatusAC({status: "loading"}))
//     tasksAPI.deleteTasks(todolistId, taskId)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(removeTaskAC({taskId, todolistId}))
//                 dispatch(setAppStatusAC({status: "succeeded"}))
//             }
//         })
// }
// export const updateTaskStatusTC_ = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
// // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва
//     dispatch(setAppStatusAC({status: "loading"}))
//     const allTasksFromState = getState().tasks;
//     const tasksForCurrentTodolist = allTasksFromState[todolistId]
//     const task = tasksForCurrentTodolist.find(t => {
//         return t.id === taskId
//     })
//     if (task) {
//         tasksAPI.updateTasks(todolistId, taskId, {
//             title: task.title,
//             startDate: task.startDate,
//             priority: task.priority,
//             description: task.description,
//             deadline: task.deadline,
//             status: status
//         }).then(res => {
//             if (res.data.resultCode === 0) {
//                 const action = changeTaskStatusAC({taskId, status, todolistId})
//                 dispatch(action)
//                 dispatch(setAppStatusAC({status: "succeeded"}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//             .catch((error: AxiosError) => {
//                 handleServerNetworkError(error.message, dispatch)
//             })
//     }
// }


const slice = createSlice({
    name: 'tasksReducer',
    initialState,
    reducers: {
        changeTaskTitleusAC: (state, action: PayloadAction<{ taskId: string, title: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index].title = action.payload.title
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistsTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistsTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todos.forEach((t: any) => {
                state[t.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(createTasksTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });
        builder.addCase(removeTasksTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(updateTaskStatusTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index].status = action.payload.status
            }
        });
    }

})

// export const tasksReducer = (state = initialState, action: any): TasksStateType => {
//     switch (action.type) {
//         case "SET-TODOS": {
//             const stateCopy = {...state}
//             action.payload.todos.forEach((t: any) => {
//                 stateCopy[t.id] = []
//             })
//             return stateCopy;
//         }
//         case 'REMOVE-TASK': {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
//             }
//         }
//         case 'ADD-TASK':
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         case 'CHANGE-TASK-STATUS': {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
//                     ? {...task, status: action.status}
//                     : task)
//             }
//         }
//         case 'CHANGE-TASK-TITLE': {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
//                     ? {...task, title: action.title}
//                     : task)
//             }
//         }
//         case 'ADD-TODOLIST':
//             return {
//                 ...state,
//                 [action.todolist.id]: []
//             }
//         case 'REMOVE-TODOLIST': {
//             let copyState = {...state}
//             delete copyState[action.id]
//             return copyState
//         }
//         case 'SET-TASKS':
//             return {...state, [action.todolistId]: action.tasks}
//         default:
//             return state
//     }
// }

export const tasksReducer = slice.reducer;
export const {changeTaskTitleusAC} = slice.actions
//Actions
// export const removeTaskAC = (taskId: string, todolistId: string) => {
//     return {type: 'REMOVE-TASK', taskId, todolistId} as const
// }
// export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
//     return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId} as const
// }
// export const changeTaskTitleusAC = (taskId: string, title: string, todolistId: string) => {
//     return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
// }
// export const setTasksAC = (tasks: Array<TasksType>, todolistId: string) => {
//     return {type: 'SET-TASKS', tasks, todolistId} as const
// }
// export const addTaskAC = (task: TasksType) => {
//     return {type: 'ADD-TASK', task} as const
// }



















