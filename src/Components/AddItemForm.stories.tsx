import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,

    argTypes: {
        addItem: {
            description: 'button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStories.args = {
addItem: action('button clicked inside form')
};

