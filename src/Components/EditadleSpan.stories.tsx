import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {EditadleSpan} from "./EditadleSpan";
import {action} from "@storybook/addon-actions";



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/EditadleSpan',
    component: EditadleSpan,
    argTypes: {
        onChange: {
            description: 'Button inside form clicked'
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value EditadleSpan'
        }
    },
} as ComponentMeta<typeof EditadleSpan>;



const Template: ComponentStory<typeof EditadleSpan> = (args) => <EditadleSpan {...args} />;

export const EditadleSpanStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditadleSpanStories.args = {
    onChange: action('Button inside form clicked')
};


