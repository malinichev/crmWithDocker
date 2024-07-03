import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => (
    <Flex style={{ height: '500px' }} {...args} />
);

export const StartStart = Template.bind({});

StartStart.args = {
    children: 'StartStart',
    justify: 'start',
    align: 'start',
};

export const StartCenter = Template.bind({});

StartCenter.args = {
    direction: 'column',
    children: (
        <>
            <div>3333</div>
            <div>4444</div>
            <div>5555</div>
        </>
    ),
    justify: 'start',
    align: 'center',
};

export const CenterCenter = Template.bind({});

CenterCenter.args = {
    direction: 'column',
    children: (
        <>
            <div>3333</div>
            <div>4444</div>
            <div>5555</div>
        </>
    ),
    justify: 'center',
    align: 'center',
};
export const EndCenter = Template.bind({});

EndCenter.args = {
    direction: 'column',
    children: (
        <>
            <div>3333</div>
            <div>4444</div>
            <div>5555</div>
        </>
    ),
    justify: 'end',
    align: 'center',
};

export const EndEnd = Template.bind({});

EndEnd.args = {
    direction: 'column',
    children: (
        <>
            <div>3333</div>
            <div>4444</div>
            <div>5555</div>
        </>
    ),
    justify: 'end',
    align: 'end',
};
