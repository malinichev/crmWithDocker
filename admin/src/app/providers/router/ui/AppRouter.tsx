import React, { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { routeConfig } from '../config/routerConfig';
import { AppRotesProps } from '@/shared/types/router';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { getRouteLogin } from '@/shared/const/router';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { Navbar } from '@/widgets/NavBar';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppToolbar } from '../../../lib/useAppToolbar';

const AppRouter = () => {
    const toolbar = useAppToolbar();
    const renderWithRoute = useCallback(
        (route: AppRotesProps) => {
            let element = (
                <Suspense fallback={<AppLoaderLayout />}>
                    {route.element}
                </Suspense>
            );

            if (route.path !== getRouteLogin()) {
                element = (
                    <MainLayout
                        header={<Navbar />}
                        content={element}
                        sidebar={<Sidebar />}
                        toolbar={toolbar}
                    />
                );
            }
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        route.authOnly ? (
                            <RequireAuth roles={route?.roles}>
                                {element}
                            </RequireAuth>
                        ) : (
                            element
                        )
                    }
                />
            );
        },
        [toolbar],
    );
    return <Routes>{Object.values(routeConfig).map(renderWithRoute)}</Routes>;
};

export default AppRouter;
