import { createAsyncThunk } from '@reduxjs/toolkit';
import { PageType } from '../types/pageSchema';
import { savePageDataMutation } from '../api/pagesApi';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const savePageService = createAsyncThunk<
    PageType,
    PageType,
    ThunkConfig<string>
>('paged/saveData', async (pageData, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    const { id, ...otherData } = pageData;

    if (!id) {
        return rejectWithValue('');
    }

    try {
        const response = await dispatch(
            savePageDataMutation({
                id,
                ...otherData,
            }),
        ).unwrap();

        if (!response) {
            return rejectWithValue('');
        }

        return response;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
