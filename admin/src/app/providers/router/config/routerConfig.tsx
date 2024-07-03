import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AppRotesProps } from '@/shared/types/router';
import {
    AppRoutes,
    getRouteEditPageInfo,
    getRouteForbidden,
    getRouteLogin,
    getRouteMain,
    getRoutePages,
} from '@/shared/const/router';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { LoginPage } from '@/pages/LoginPage';
import { UserRole } from '@/entites/User';
import { EditPageInfo } from '@/pages/EditPageInfo';
import { AllPages } from '@/pages/AllPage';

export const routeConfig: Record<AppRoutes, AppRotesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        authOnly: true,
        roles: [UserRole.USER],
    },

    [AppRoutes.PAGES]: {
        path: getRoutePages(),
        element: <AllPages />,
        authOnly: true,
        roles: [UserRole.USER],
    },
    [AppRoutes.EditPageInfo]: {
        path: getRouteEditPageInfo(':pageId'),
        element: <EditPageInfo />,
        authOnly: true,
        roles: [UserRole.USER],
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
