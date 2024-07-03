import { StateSchema } from '@/app/providers/StoreProvider';

import { UserRes } from '../../types/user';
import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData.test', () => {
    test('should return User data', () => {
        const data: UserRes = {
            accessToken: '',
            refreshToken: '',
            user: {
                id: '1',
                email: 'Sergey',
            },
        };

        const state: DeepPartial<StateSchema> = {
            user: {
                authData: data.user,
            },
        };
        expect(getUserAuthData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getUserAuthData(state as StateSchema)).toEqual(undefined);
    });
});
