import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getAllPagesQuery } from '@/entites/AllPages/model/api/allPagesApi';
import { AllPagesSchema } from '@/entites/AllPages';

export const getAllPagesService = createAsyncThunk<
    AllPagesSchema,
    void,
    ThunkConfig<string>
>('allPages/getAllPagesService', async (_, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
        const response = await dispatch(getAllPagesQuery()).unwrap();

        if (!response) {
            return rejectWithValue('');
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
