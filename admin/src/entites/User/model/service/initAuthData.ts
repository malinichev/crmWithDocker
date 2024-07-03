import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../api/userApi';
import { UserRes } from '../types/user';
import {
    TOKEN_LOCALSTORAGE_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';
import { userActions } from '../slice/userSlice';

export const initAuthData = createAsyncThunk<
    UserRes,
    void,
    ThunkConfig<string>
>('user/initAuthData', async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    const userData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);

    if (!userData || !token) {
        return rejectWithValue('');
    }

    try {
        const userId = JSON.parse(userData);

        const response = await dispatch(
            getUserDataByIdQuery({ userId }),
        ).unwrap();

        await dispatch(userActions.setAuthData(response));

        if (!response) {
            return rejectWithValue('');
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
