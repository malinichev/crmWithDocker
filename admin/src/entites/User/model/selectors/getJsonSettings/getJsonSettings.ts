import { createSelector } from '@reduxjs/toolkit';
import { buildSelector } from '@/shared/lib/store';
import { getUserAuthData } from '../getUserAuthData/getUserAuthData';
import { JsonSettings } from '@/entites/User/model/types/jsonSettings';

const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
    createSelector(getUserAuthData, (authData) => {
        return authData?.json ?? defaultJsonSettings;
    }),
);

export const [useJsonSettingsKey, getJsonSettingsKey] = buildSelector(
    (state, key: keyof JsonSettings) => state.user.authData?.json?.[key],
);
