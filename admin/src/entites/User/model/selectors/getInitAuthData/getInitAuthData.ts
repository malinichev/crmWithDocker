import { StateSchema } from '@/app/providers/StoreProvider';

export const getInitAuthData = (state: StateSchema) => state?.user?._initAuth;
