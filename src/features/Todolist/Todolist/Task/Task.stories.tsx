import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/types";
import {ReduxStoreProviderDecorator} from "../../ReduxStoreProviderDecorator";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
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


