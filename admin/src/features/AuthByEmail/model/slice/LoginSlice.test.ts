import { LoginSchema } from '../types/LoginSchema';
import { loginAction, loginReducer } from './LoginSlice';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';

describe('LoginSlice.test', () => {
    test('test set userName', () => {
        const state: DeepPartial<LoginSchema> = {
            email: '123',
        };
        expect(
            loginReducer(
                state as LoginSchema,
                loginAction.setUserName('123456'),
            ),
        ).toEqual({ email: '123456' });
    });
    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: '123',
        };
        expect(
            loginReducer(
                state as LoginSchema,
                loginAction.setPassword('123456'),
            ),
        ).toEqual({ password: '123456' });
    });
    test('test set isLoad', () => {
        const state: DeepPartial<LoginSchema> = {};
        expect(
            loginReducer(state as LoginSchema, loginByEmail.pending),
        ).toEqual({
            isLoading: true,
        });
    });
});

// import {
//     counterAction, counterReducer, CounterSchema,
// } from 'entities/Counter';
//
// describe('CounterSlice', () => {
//     test('Test CounterSlice increment', () => {
//         const state: CounterSchema = {
//             value: 10,
//         };
//         expect(counterReducer(state, counterAction.increment())).toEqual({
//             value: 11,
//         });
//     });
//     test('Test CounterSlice decrement', () => {
//         const state: CounterSchema = {
//             value: 10,
//         };
//         expect(counterReducer(state, counterAction.decrement())).toEqual({
//             value: 9,
//         });
//     });
//
//     test('Test CounterSlice undefined state', () => {
//         expect(counterReducer(undefined, counterAction.decrement())).toEqual({
//             value: -1,
//         });
//     });
// });
