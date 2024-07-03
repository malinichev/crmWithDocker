import { rtkApi } from '@/shared/api/rtkApi';
import { User, UserRes } from '../types/user';
import { JsonSettings } from '../types/jsonSettings';

interface SetJsonSettingsArg {
    userId: string;
    json: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            query: ({ userId, json }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    json,
                },
            }),
        }),
        getUserDataById: build.query<UserRes, { userId: string }>({
            query: ({ userId }) => ({
                url: `/users/${userId}`,
                method: 'POST',
            }),
        }),
    }),
});

export const setJsonSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
