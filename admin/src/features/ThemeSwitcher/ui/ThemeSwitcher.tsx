import { useCallback } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { saveJsonSettings } from '@/entites/User/model/service/saveJsonSettings';
import { Icon } from '@/shared/ui/Icon';
import ThemeIcon from '@/shared/assets/icons/theme.svg';

export const ThemeSwitcher = () => {
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />;
};
