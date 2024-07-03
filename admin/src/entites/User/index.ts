export { initAuthData } from './model/service/initAuthData';

export { getInitAuthData } from './model/selectors/getInitAuthData/getInitAuthData';

export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export {
    isUserAdmin,
    isUserManager,
    getUserRoles,
} from './model/selectors/roleSelector/roleSelector';

export { userReducer, userActions } from './model/slice/userSlice';

export type { UserSchema, UserRes, User } from './model/types/user';
export { UserRole } from './model/consts/consts';
