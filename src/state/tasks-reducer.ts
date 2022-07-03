import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType, setTososType} from "./todolist-reducer";
import {v1} from "uuid";
import {TaskPriorities, tasksAPI, TaskStatuses, TasksType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export type RemoveTASKActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type SetTasksAType = ReturnType<typeof setTasksAC>
type addTaskType = ReturnType<typeof addTaskAC>

type ActionType = RemoveTASKActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType |
    RemoveTodolistActionType | setTososType | SetTasksAType | addTaskType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOS": {
            const stateCopy = {...state}
            action.payload.todos.forEach((t) => {
                stateCopy[t.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, status: action.status}
                    : task)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, title: action.title}
                    : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []

            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            return state
    }

}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTASKActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleusAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const setTasksAC = (tasks: Array<TasksType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}
export const addTaskAC = (task: TasksType) => {
    return {type: 'ADD-TASK', task} as const
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}
export const createTasksTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTasks(todolistId, title)
            .then((res) => {
                const action = addTaskAC(res.data.data.item)
                dispatch(action)
            })
    }
}
export const removeTasksTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId))
                }
            })
    }
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва
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
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}














