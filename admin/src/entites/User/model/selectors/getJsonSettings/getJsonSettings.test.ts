import { StateSchema } from '@/app/providers/StoreProvider';

import { UserRes } from '../../types/user';
import { getJsonSettings } from './getJsonSettings';
import { Theme } from '@/shared/const/theme';

describe('getJsonSettings.test', () => {
    test('should return User data', () => {
        const data: UserRes = {
            accessToken: '',
            refreshToken: '',
            user: {
                id: '1',
                email: 'Sergey',
                json: {
                    theme: Theme.DARK,
                },
            },
        };

        const state: DeepPartial<StateSchema> = {
            user: {
                authData: data.user,
            },
        };
        expect(getJsonSettings(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getJsonSettings(state as StateSchema)).toEqual(undefined);
    });
});
