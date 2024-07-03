import { memo, ReactNode } from 'react';
import cls from './Page.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TestProps } from '@/shared/types/tests';

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
    const { className, children } = props;

    return (
        <main
            id={PAGE_ID}
            data-testid={props['data-testid'] ?? 'Page'}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
        </main>
    );
});
