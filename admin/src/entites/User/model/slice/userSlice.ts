import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema, UserRes } from '../types/user';
import { initAuthData } from '../service/initAuthData';
import { saveJsonSettings } from '../service/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';

const initialState: UserSchema = {
    _initAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<UserRes>) => {
            console.log('setAuthData');
            state.authData = { ...payload.user };
        },
        logout: (state) => {
            console.log('logout');
            state.authData = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.json = payload;
                }
            },
        );
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<UserRes>) => {
                state.authData = payload.user;
                state._initAuth = true;
                console.log('initAuthData fulfilled');
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._initAuth = true;
            console.log('initAuthData rejected');
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
