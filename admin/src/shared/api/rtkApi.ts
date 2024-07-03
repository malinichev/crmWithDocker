import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { createApi } from '@reduxjs/toolkit/query/react';
import 'isomorphic-fetch';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { userActions, UserRes } from '@/entites/User';

const baseQuery = fetchBaseQuery({
    baseUrl: __API__,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || '';
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// create a new mutex
const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const { data } = await baseQuery('/refresh', api, extraOptions);

                if (data) {
                    localStorage.setItem(
                        TOKEN_LOCALSTORAGE_KEY,
                        (data as UserRes).accessToken,
                    );
                    api.dispatch(userActions.setAuthData(data as UserRes));
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(userActions.logout());
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});
