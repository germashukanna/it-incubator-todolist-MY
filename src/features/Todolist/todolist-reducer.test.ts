import { v1 } from 'uuid'
import {
    AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, FilterValueType,
    RemoveTodolistAC, TodolistDomainType,
    todolistsReducer,
} from "./todolist-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType>

beforeEach(() => {
     todolistId1 = v1()
     todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: "", order: 0, entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let newTodolist = {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: "", order: 0}

    const endState = todolistsReducer(startState, AddTodolistAC({todolist: newTodolist}))

    expect(endState.length).toBe(3)
 //   expect(endState[1].title).toBe(newTodolist)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const action = ChangeTodolistTitleAC({id: todolistId2, title: newTodolistTitle})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = 'completed'

     const action = ChangeTodolistFilterAC({id: todolistId2, filter: newFilter})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})