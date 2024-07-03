import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entites/User';

export type AppRotesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};
