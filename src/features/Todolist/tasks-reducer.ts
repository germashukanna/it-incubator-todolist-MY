import {
    AddTodolistAC,
    AddTodolistActionType,
    RemoveTodolistAC,
    RemoveTodolistActionType, setTososAC,
    setTososType
} from "./todolist-reducer";
import {tasksAPI, TaskStatuses, TasksType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {TasksStateType} from "../../app/AppWithRedux";
import {AppActionsType, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



//Types
export type RemoveTASKActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleusAC>
type SetTasksAType = ReturnType<typeof setTasksAC>
type addTaskType = ReturnType<typeof addTaskAC>

export type ActionType = RemoveTASKActionType
    | addTaskType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType | setTososType | SetTasksAType
    | AppActionsType

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasksReducer',
    initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        changeTaskStatusAC: (state, action: PayloadAction<{ taskId: string, status: TaskStatuses, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index].status = action.payload.status
            }
        },
        changeTaskTitleusAC: (state, action: PayloadAction<{ taskId: string, title: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index].title = action.payload.title
            }
        },
        setTasksAC: (state, action: PayloadAction<{ tasks: Array<TasksType>, todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
        addTaskAC: (state, action: PayloadAction<{ task: TasksType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AddTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(RemoveTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTososAC, (state, action) => {
            action.payload.todos.forEach((t: any) => {
                state[t.id] = []
            })
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
export const {
    removeTaskAC, changeTaskStatusAC, changeTaskTitleusAC,
    setTasksAC, addTaskAC
} = slice.actions
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

//Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    tasksAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC({tasks, todolistId})
            dispatch(action)
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}
export const createTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    tasksAPI.createTasks(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const action = addTaskAC({task: res.data.data.item})
                dispatch(action)
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC({status: "loading"}))
    tasksAPI.deleteTasks(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({taskId, todolistId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            }
        })
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва
    dispatch(setAppStatusAC({status: "loading"}))
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    if (task) {
        tasksAPI.updateTasks(todolistId, taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        }).then(res => {
            if (res.data.resultCode === 0) {
                const action = changeTaskStatusAC({taskId, status, todolistId})
                dispatch(action)
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
}

















