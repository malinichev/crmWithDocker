import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { userActions, UserRes } from '@/entites/User';

interface loginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<
    UserRes,
    loginByEmailProps,
    ThunkConfig<string>
>('login/loginByEmail', async (authData, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await extra.api.post<UserRes>('/login', authData);
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
