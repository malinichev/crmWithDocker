import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getUser = (state: StateSchema) => {
    return state.user;
};

export const getUserAuthData = createSelector(getUser, (user) => {
    return user?.authData;
});
