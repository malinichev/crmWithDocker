export enum AppRoutes {
    PAGES = 'pages',
    EditPageInfo = 'edit-page',
    MAIN = 'main',
    LOGIN = 'login',
    NOT_FOUND = 'not_found',
    FORBIDDEN = 'forbidden',
}

export const getRoutePages = () => `/pages`;
export const getRouteEditPageInfo = (id: string) => `/edit-page/${id}`;
export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRoutePages()]: AppRoutes.PAGES,
    [getRouteEditPageInfo(':pageId')]: AppRoutes.EditPageInfo,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
    [getRouteLogin()]: AppRoutes.LOGIN,
};
