import { UserRes, UserSchema } from '../types/user';
import { userActions, userReducer } from './userSlice';

const data: UserRes = {
    accessToken: '',
    refreshToken: '',
    user: {
        id: '1',
        email: 'Sergey',
    },
};

describe('userSlice.test', () => {
    test('test setAuthData, authData should be User', () => {
        const state: DeepPartial<UserSchema> = {};

        expect(
            userReducer(state as UserSchema, userActions.setAuthData(data)),
        ).toEqual({ authData: data });
    });

    // test('test initAuthData, _initAuth should be true', () => {
    //     const state: DeepPartial<UserSchema> = {
    //         _initAuth: false,
    //     };
    //
    //     expect(
    //         userReducer(state as UserSchema, userActions.setAuthData()),
    //     ).toEqual({ _initAuth: true });
    // });

    test('test logout, authData should be undefined', () => {
        const state: DeepPartial<UserSchema> = {
            authData: {
                id: '1',
            },
        };

        expect(userReducer(state as UserSchema, userActions.logout())).toEqual({
            authData: undefined,
        });
    });
});
