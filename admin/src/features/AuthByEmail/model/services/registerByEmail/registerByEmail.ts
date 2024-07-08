import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { userActions, UserRes } from '@/entites/User';

interface registerByEmailProps {
    email: string;
    password: string;
}

export const registerByEmail = createAsyncThunk<
    UserRes,
    registerByEmailProps,
    ThunkConfig<string>
>('register/registerByEmail', async (authData, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await extra.api.post<UserRes>(
            '/registration',
            authData,
        );
        if (!response.data) {
            throw new Error();
        }

        await dispatch(userActions.setAuthData(response.data));
        // extra.navigate('/');
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
