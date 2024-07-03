import { createSelector } from '@reduxjs/toolkit';

import MainIcon from '@/shared/assets/icons/home.svg';
import Info from '@/shared/assets/icons/Info.svg';

import { SidebarItemType } from '../types/sidebar';
import { getRouteEditPageInfo, getRouteMain } from '@/shared/const/router';

export const getSidebarItems = createSelector(
    () => {},
    () => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: getRouteEditPageInfo('1'),
                Icon: Info,
                text: 'Редактор станиц',
            },
        ];

        return sidebarItemsList;
    },
);
