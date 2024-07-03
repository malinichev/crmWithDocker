import React, { memo, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import { AppRouter } from './providers/router';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getInitAuthData, initAuthData } from '@/entites/User';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';

const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const _initAuth = useSelector(getInitAuthData);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!_initAuth) {
        return (
            <div id="app" className={classNames('app_redesigned', {}, [theme])}>
                <AppLoaderLayout />{' '}
            </div>
        );
    }
    return (
        <div id="app" className={classNames('app_redesigned', {}, [theme])}>
            <Suspense fallback="">
                <AppRouter />
            </Suspense>
        </div>
    );
});

export default withTheme(App);
