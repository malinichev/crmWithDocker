import { Action, Dispatch, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
// import { USER_TOKEN_KEY } from '@/shared/const/localstorage';

import { StateSchema } from '@/app/providers/StoreProvider';
import { loginByEmail } from '@/features/AuthByEmail';
import { userActions } from '@/entites/User';
import {
    TOKEN_LOCALSTORAGE_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';

interface Store {
    dispatch: Dispatch;
    getState: () => StateSchema;
}

const isLoggedIn = isFulfilled(loginByEmail);
const isLoggedOut = isAnyOf(userActions.logout);

export const authMiddleware =
    (store: Store) =>
    (next: (action: Action) => void) =>
    (action: Action): void => {
        if (isLoggedIn(action)) {
            localStorage.setItem(
                TOKEN_LOCALSTORAGE_KEY,
                action.payload?.accessToken,
            );
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                action.payload.user?.id,
            );
        }

        if (isLoggedOut(action)) {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
        }

        next(action);
    };
