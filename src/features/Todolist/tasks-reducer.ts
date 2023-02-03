import {TasksStateType} from "../../app/AppWithRedux";
import {AppActionsType} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeTaskTitleTC, createTasksTC, fetchTasksTC, removeTasksTC, updateTaskStatusTC} from "./tasks-actions";
import {addTodolistsTC, fetchTodolistsTC, removeTodolistsTC} from "./todolists-actions";


//Types
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleusAC>

export type ActionType =
    | ChangeTaskTitleActionType
    | AppActionsType

const initialState: TasksStateType = {}

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
        builder.addCase(changeTaskTitleTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index].title = action.payload.title
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



















