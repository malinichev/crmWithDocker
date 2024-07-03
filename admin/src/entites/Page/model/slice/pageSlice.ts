import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageSchema, PageType } from '../types/pageSchema';
import { getPageByIdService, savePageService } from '@/entites/Page';

const initialState: PageSchema = {};

export const pageSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            savePageService.fulfilled,
            (state, { payload }: PayloadAction<PageType>) => {
                if (payload) {
                    return {
                        ...state,
                        [payload.id]: payload,
                    };
                }
                return state;
            },
        );
        builder.addCase(
            getPageByIdService.fulfilled,
            (state, { payload }: PayloadAction<PageType>) => {
                if (payload) {
                    return {
                        ...state,
                        [payload.id]: payload,
                    };
                }
                return state;
            },
        );
    },
});

// Action creators are generated for each case reducer function
export const { actions: pagesActions } = pageSlice;
export const { reducer: pagesReducer } = pageSlice;
