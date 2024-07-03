import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/LoginSchema';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';

const initialState: LoginSchema = {
    email: '',
    password: '',
    isLoading: false,
};

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(loginByEmail.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state, action) => {
                state.isLoading = false;

                // state.user = action.payload;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { actions: loginAction } = LoginSlice;
export const { reducer: loginReducer } = LoginSlice;
