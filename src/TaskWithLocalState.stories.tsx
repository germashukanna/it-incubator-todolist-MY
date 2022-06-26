import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TasksType} from "./Components/Todolist";
import {v1} from "uuid";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/TaskWithLocalState',
    component: Task,
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: "todolistId"
    }
} as ComponentMeta<typeof Task>;

const TaskWithLocalState = () => {

    let [task, setTask] = useState<TasksType>({id: v1(), title: 'HTML&CSS', isDone: true},)

    const changeTaskStatus = () => setTask({...task, isDone: !task.isDone})
    const changeTaskTitle = (id: string, title: string) => setTask({...task, title})

    return <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}
                 removeTask={action('removeTask')} task={task} todolistId={"dddd"}/>
}

const Template: ComponentStory<typeof TaskWithLocalState> = (args) => <TaskWithLocalState/>;

export const TaskWithLocalStateStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskWithLocalStateStories.args = {};




