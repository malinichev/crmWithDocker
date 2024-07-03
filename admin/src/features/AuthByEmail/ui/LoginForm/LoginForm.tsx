import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
    getLoginError,
    getLoginIsLoading,
    getLoginPassword,
    getLoginEmail,
} from '../../model';

import cls from './LoginForm.module.scss';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { loginAction, loginReducer } from '../../model/slice/LoginSlice';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import { getRouteMain } from '@/shared/const/router';

interface LoginFormProps {
    className?: string;
}

const reducers: ReducersList = {
    login: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);
    const password = useSelector(getLoginPassword);
    const email = useSelector(getLoginEmail);
    const forceUpdate = useForceUpdate();

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginAction.setUserName(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginAction.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByEmail({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            console.log(22222);
            navigate(getRouteMain());
        }
    }, [dispatch, email, navigate, password]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                className={classNames(cls.LoginForm, {}, [className])}
                gap="16"
                justify="end"
            >
                <Text title={t('Форма авторизации')} />

                <Input
                    autofocus
                    type="email"
                    value={email}
                    onChange={onChangeUsername}
                    placeholder={t('Введите email')}
                />
                <Input
                    type="text"
                    value={password}
                    onChange={onChangePassword}
                    placeholder={t('Введите пароль')}
                />
                <HStack max gap="16">
                    {error && (
                        <Text
                            text={t('Вы ввели неверный логин или пароль')}
                            variant="error"
                        />
                    )}
                    <Button
                        variant="outline"
                        onClick={onLoginClick}
                        disabled={isLoading}
                        className={cls.loginBtnRedesigned}
                    >
                        {t('Войти')}
                    </Button>
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
