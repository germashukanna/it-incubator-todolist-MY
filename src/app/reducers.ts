import {combineReducers} from "redux";
import {tasksReducer, todolistsReducer} from "../features/Todolist";
import {appReducer} from "../features/App";
import {loginReducer} from "../features/Login";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    appReducer: appReducer,
    login: loginReducer
})