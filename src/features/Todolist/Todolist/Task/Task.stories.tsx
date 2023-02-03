import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/tasks-api";
import {ReduxStoreProviderDecorator} from "../../ReduxStoreProviderDecorator";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    // args: {
    //     changeTaskStatus: action('changeTaskStatus'),
    //     changeTaskTitle: action('changeTaskTitle'),
    //     removeTask: action('removeTask'),
    //     todolistId: "todolistId"
    // },
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStories.args = {
    task: {id: 'fff', status: TaskStatuses.Completed, title: 'CSS', todoListId: 'todolistID1',
        description: '', startDate: '', deadline: '', addedDate: '', order: 0,
        priority: TaskPriorities.Low, entityStatus: "idle"},

};

export const TaskIsNotDoneStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStories.args = {
    task: {id: 'fff', status: TaskStatuses.New, title: 'JS', todoListId: 'todolistID1',
        description: '', startDate: '', deadline: '', addedDate: '', order: 0,
        priority: TaskPriorities.Low, entityStatus: "idle"},
}


