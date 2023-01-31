import {addTaskAC, changeTaskStatusAC, changeTaskTitleusAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {RemoveTodolistAC} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";
import {TasksStateType} from "../../app/AppWithRedux";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"}
        ]
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({taskId: '2', todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, entityStatus: "idle"}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC({task: {id: '3', title: 'juce', status: TaskStatuses.New, todoListId: 'todolistId2',
        description: '', startDate: '', deadline: '', addedDate: '', order: 0,
        priority: TaskPriorities.Low, entityStatus: "idle"}});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);

})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC({taskId: "2", status: TaskStatuses.New, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});

test('Change Title', () => {

    const action = changeTaskTitleusAC({taskId: '2', title: "Juce", todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe('JS');
    expect(endState["todolistId2"][1].title).toBe("Juce");
})

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC({id: "todolistId2"});

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
