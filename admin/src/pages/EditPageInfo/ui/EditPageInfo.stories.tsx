import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import EditPageInfo from './EditPageInfo';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/EditPageInfo',
    component: EditPageInfo,
    decorators: [StoreDecorator({})],
    argTypes: {},
} as ComponentMeta<typeof EditPageInfo>;

const Template: ComponentStory<typeof EditPageInfo> = () => <EditPageInfo />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
