import React from 'react';
import ThemeProvider from './ThemeProvider';
import { useJsonSettings } from '@/entites/User/model/selectors/getJsonSettings/getJsonSettings';

export const withTheme = (Component: React.ComponentType) => {
    return () => {
        const { theme: defaultTheme } = useJsonSettings();
        return (
            <ThemeProvider initialTheme={defaultTheme}>
                <Component />
            </ThemeProvider>
        );
    };
};
