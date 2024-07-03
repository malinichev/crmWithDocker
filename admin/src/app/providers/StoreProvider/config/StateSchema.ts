import { EnhancedStore } from '@reduxjs/toolkit/src/configureStore';
import {
    AnyAction,
    CombinedState,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { rtkApi } from '@/shared/api/rtkApi';
import { LoginSchema } from '@/features/AuthByEmail';
import { UserSchema } from '@/entites/User';
import { PageSchema } from '@/entites/Page';
import { AllPagesSchema } from '@/entites/AllPages';

export interface StateSchema {
    pages: PageSchema;
    allPages: AllPagesSchema;
    user: UserSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    // Асинхронные редюсеры
    login?: LoginSchema;
    // profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;

    // navigate?: (s: string) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
