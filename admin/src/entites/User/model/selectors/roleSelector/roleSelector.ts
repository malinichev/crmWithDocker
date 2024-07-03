import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../../consts/consts';
import { getUserAuthData } from '@/entites/User';

export const getUserRoles = createSelector(getUserAuthData, (authData) => {
    return authData?.roles || [];
});

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN)),
);

export const isUserManager = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.MANAGER)),
);
