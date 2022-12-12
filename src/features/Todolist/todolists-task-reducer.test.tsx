import {AddTodolistAC, TodolistDomainType, todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../../app/AppWithRedux";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = AddTodolistAC({todolist: {id: "3", order: 1, addedDate: "", title: "NewTodo"}})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})

