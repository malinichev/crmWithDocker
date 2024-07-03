import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AllPageData,
    AllPagesSchema,
    getAllPagesService,
} from '@/entites/AllPages';

const initialState: AllPagesSchema = [];

export const allPageSlice = createSlice({
    name: 'allPages',
    initialState,
    reducers: {
        addToAllPage: (state, action: PayloadAction<AllPageData>) => {
            if (action.payload) {
                state = [...state, { id: action.payload?.id }];
            }
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getAllPagesService.fulfilled,
            (state, { payload }: PayloadAction<AllPagesSchema>) => {
                if (payload) {
                    return payload;
                }
                return state;
            },
        );
    },
});

// Action creators are generated for each case reducer function
export const { actions: allPagesActions } = allPageSlice;
export const { reducer: allPagesReducer } = allPageSlice;
