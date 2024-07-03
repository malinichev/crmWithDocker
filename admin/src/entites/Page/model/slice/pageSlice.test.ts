import { PageSchema } from '@/entites/Page/model/types/pageSchema';

describe('userSlice.test', () => {
    test('test setAuthData, authData should be User', () => {
        const state: DeepPartial<PageSchema> = {};

        // expect(
        // userReducer(state as UserSchema, userActions.setAuthData(data)),
        // ).toEqual({ authData: data });
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

    // test('test logout, authData should be undefined', () => {
    //     const state: DeepPartial<UserSchema> = {
    //         authData: {
    //             id: '1',
    //         },
    //     };
    //
    //     expect(userReducer(state as UserSchema, userActions.logout())).toEqual({
    //         authData: undefined,
    //     });
    // });
});
