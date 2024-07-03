import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Text } from '@/shared/ui/Text/Text';

import {
    getPageByIdService,
    getPageData,
    savePageService,
} from '@/entites/Page';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';
import cls from './EditPageInfo.module.scss';
import { Button } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TextArea } from '@/shared/ui/TextArea';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteEditPageInfo } from '@/shared/const/router';
import {
    allPagesActions,
    getAllPageData,
    getAllPagesService,
} from '@/entites/AllPages';
import { Loader } from '@/shared/ui/Loader';

const EditPageInfo = memo(() => {
    const { t } = useTranslation();
    const { pageId } = useParams();
    const dispatch = useAppDispatch();
    const pageData = useSelector(getPageData(Number(pageId)));
    const [customJson, setCustomJson] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const allPageData = useSelector(getAllPageData);

    useEffect(() => {
        dispatch(getAllPagesService());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getPageByIdService(Number(pageId)));
    }, [dispatch, pageId]);

    useEffect(() => {
        if (pageData?.json) {
            setCustomJson(JSON.stringify(pageData?.json ?? {}, null, 2));
        }
    }, [pageData?.json]);

    const sendCustomData = useCallback(
        async (json: any) => {
            setLoading(true);
            try {
                await dispatch(
                    savePageService({
                        id: Number(pageId),
                        json,
                    }),
                );

                setLoading(false);
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        },
        [dispatch, pageId],
    );

    const handleCustomJson = useCallback(() => {
        setError('');
        try {
            const newData = JSON.parse(customJson);
            console.log(newData);
            sendCustomData(newData);
        } catch (e) {
            setError(t('Чтото не так с кастомными данными, поправь'));
        }
    }, [customJson, sendCustomData, t]);

    const handleAddPage = useCallback(async () => {
        setLoading(true);
        try {
            const res = await dispatch(
                savePageService({
                    id: Number(allPageData.length + 1),
                    json: {},
                }),
            );

            if (typeof res.payload !== 'string' && res.payload?.id) {
                await dispatch(allPagesActions.addToAllPage(res.payload));
            }

            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }, [allPageData.length, dispatch]);

    return (
        <Page data-testid="EditPageInfo">
            {loading ? (
                <Loader />
            ) : (
                <Flex direction="column" align="start" gap="24" max>
                    <Flex
                        className={cls.pageLinks}
                        direction="row"
                        align="start"
                        gap="24"
                    >
                        {allPageData &&
                            allPageData.map((pageData, index) => {
                                return (
                                    <AppLink
                                        activeClassName={cls.pageLink}
                                        key={String(index)}
                                        to={getRouteEditPageInfo(
                                            String(pageData.id),
                                        )}
                                    >
                                        <Text
                                            title={t(
                                                'Страница {{pageNumber}}',
                                                {
                                                    pageNumber: pageData.id,
                                                },
                                            )}
                                        />
                                    </AppLink>
                                );
                            })}
                        <Button variant="clear" onClick={handleAddPage}>
                            <Text title={t('+')} />
                        </Button>
                    </Flex>
                    <Flex
                        max
                        align="start"
                        gap="24"
                        direction="column"
                        className={classNames('', {
                            [cls.isClose]: false,
                        })}
                    >
                        <TextArea
                            size="content"
                            onChange={(value: string) => setCustomJson(value)}
                            value={customJson}
                            placeholder={t('Новое значение')}
                        />
                        <Button
                            disabled={!customJson}
                            className={cls.addFieldButton}
                            onClick={handleCustomJson}
                        >
                            {t('Сохранить')}
                        </Button>
                        {error && <Text text={error} />}
                    </Flex>
                </Flex>
            )}
        </Page>
    );
});

export default EditPageInfo;
