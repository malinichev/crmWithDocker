import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { createReducerManager } from './createReducerManager';
import { $api } from '@/shared/api/api';
import { ThunkExtraArg } from './StateSchema';
import { authMiddleware } from '../middlewares/authMiddleware';
import { rtkApi } from '@/shared/api/rtkApi';
import { userReducer } from '@/entites/User';
import { pagesReducer } from '@/entites/Page';
import { allPagesReducer } from '@/entites/AllPages';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        allPages: allPagesReducer,
        pages: pagesReducer,
        user: userReducer,
        // pageRestoreScroll: pageRestoreScrollReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(rtkApi.middleware, authMiddleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
