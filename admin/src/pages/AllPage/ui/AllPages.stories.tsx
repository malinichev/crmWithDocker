import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import AllPages from './AllPages';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/AllPages',
    component: AllPages,
    decorators: [StoreDecorator({})],
    argTypes: {},
} as ComponentMeta<typeof AllPages>;

const Template: ComponentStory<typeof AllPages> = () => <AllPages />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
