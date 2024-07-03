import { StateSchema } from '@/app/providers/StoreProvider';

import { getInitAuthData } from './getInitAuthData';

describe('getInitAuthData.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                _initAuth: true,
            },
        };
        expect(getInitAuthData(state as StateSchema)).toEqual(true);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getInitAuthData(state as StateSchema)).toEqual(undefined);
    });
});
