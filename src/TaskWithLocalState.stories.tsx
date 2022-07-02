// import React, {useState} from 'react';
// import {ComponentMeta, ComponentStory} from '@storybook/react';
// import {action} from "@storybook/addon-actions";
// import {Task} from "./Task";
// import {v1} from "uuid";
// import {TaskPriorities, TaskStatuses, TasksType} from "./api/tasks-api";
//
//
// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// export default {
//     title: 'TODOLISTS/TaskWithLocalState',
//     component: Task,
//     args: {
//         changeTaskStatus: action('changeTaskStatus'),
//         changeTaskTitle: action('changeTaskTitle'),
//         removeTask: action('removeTask'),
//         todolistId: "todolistId"
//     }
// } as ComponentMeta<typeof Task>;
//
// const TaskWithLocalState = () => {
//
//     let [task, setTask] = useState<TasksType>({id: v1(), title: 'HTML&CSS',
//         status: TaskStatuses.Completed, todoListId: 'todolistID1',
//         description: '', startDate: '', deadline: '', addedDate: '', order: 0,
//         priority: TaskPriorities.Low},)
//
//     const changeTaskStatus = () => setTask({...task, status: TaskStatuses.New})
//     const changeTaskTitle = (id: string, title: string) => setTask({...task, title})
//
//     return <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}
//                  removeTask={action('removeTask')} task={task} todolistId={"dddd"}/>
// }
//
// const Template: ComponentStory<typeof TaskWithLocalState> = (args) => <TaskWithLocalState/>;
//
// export const TaskWithLocalStateStories = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TaskWithLocalStateStories.args = {};




