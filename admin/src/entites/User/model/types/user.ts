import { UserRole } from '../consts/consts';
import { JsonSettings } from '@/entites/User/model/types/jsonSettings';

export interface User {
    id: string;
    email: string;
    roles?: UserRole[];
    json?: JsonSettings;
}

export interface UserSchema {
    authData?: User;
    _initAuth: boolean;
}

export interface UserRes {
    accessToken: string;
    refreshToken: string;
    user: User;
}
