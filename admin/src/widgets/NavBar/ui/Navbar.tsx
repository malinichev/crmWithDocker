import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
// import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

// import { LoginModal } from '@/features/AuthByUsername';
// import { getUserAuthData } from '@/entities/User';
// import { NotificationButton } from '@/features/NotificationButton';
// import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { userActions } from '@/entites/User';

// import { HStack } from '@/shared/ui/Stack';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const handleOnLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
            <Button
                variant="clear"
                className={cls.links}
                onClick={handleOnLogout}
            >
                {t('Выйти')}
            </Button>
        </header>
    );
});
