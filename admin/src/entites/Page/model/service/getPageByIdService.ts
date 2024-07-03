import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { PageType } from '../types/pageSchema';
import { getPageByIdQuery } from '../api/pagesApi';

export const getPageByIdService = createAsyncThunk<
    PageType,
    number,
    ThunkConfig<string>
>('pages/getPageById', async (id, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    if (!id) {
        return rejectWithValue('');
    }

    try {
        const response = await dispatch(getPageByIdQuery(id)).unwrap();

        if (!response) {
            return rejectWithValue('');
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
