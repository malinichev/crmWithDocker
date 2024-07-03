import { Provider } from 'react-redux';
import { ReactNode } from 'react';

import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { createReduxStore } from '../config/createReduxStore';

interface StoreProviderType {
    children: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderType) => {
    const { children, initialState, asyncReducers } = props;
    // const navigate = useNavigate();
    const store = createReduxStore(
        // navigate,
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
    );

    return <Provider store={store}>{children}</Provider>;
};
