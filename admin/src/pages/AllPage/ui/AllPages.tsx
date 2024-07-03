import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cls from './AllPages.module.scss';
import { Page } from '@/widgets/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Text } from '@/shared/ui/Text';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';
import { getAllPageData, getAllPagesService } from '@/entites/AllPages';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteEditPageInfo } from '@/shared/const/router';

const AllPages = memo(() => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const allPageData = useSelector(getAllPageData);

    useEffect(() => {
        dispatch(getAllPagesService());
    }, [dispatch]);

    return (
        <Page data-testid="AllPages">
            <Flex align="start" direction="column" gap="8">
                <Text title={t('Выбери страницу')} />
                <Flex direction="column" gap="8">
                    {allPageData &&
                        allPageData.map((pageData, index) => {
                            return (
                                <AppLink
                                    key={String(index)}
                                    to={getRouteEditPageInfo(
                                        String(pageData.id),
                                    )}
                                >
                                    <Text
                                        className={cls.pageLink}
                                        text={t('Страница {{pageNumber}}', {
                                            pageNumber: pageData.id,
                                        })}
                                    />
                                </AppLink>
                            );
                        })}
                </Flex>
            </Flex>
        </Page>
    );
});

export default AllPages;
