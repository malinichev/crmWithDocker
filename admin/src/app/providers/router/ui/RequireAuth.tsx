// import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getRouteForbidden, getRouteLogin } from '@/shared/const/router';
import { getUserAuthData, getUserRoles, UserRole } from '@/entites/User';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[];
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequireRole = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((requireRole) =>
            Boolean(userRoles?.includes(requireRole)),
        );
    }, [roles, userRoles]);

    if (!auth) {
        return (
            <Navigate to={getRouteLogin()} state={{ from: location }} replace />
        );
    }

    if (!hasRequireRole) {
        return (
            <Navigate
                to={getRouteForbidden()}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};
