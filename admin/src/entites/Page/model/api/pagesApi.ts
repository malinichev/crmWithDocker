import { rtkApi } from '@/shared/api/rtkApi';
import { PageType } from '../types/pageSchema';

const pagesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        savePageData: build.mutation<PageType, PageType>({
            query: ({ id, json, title, description }) => ({
                url: `/pages/${id}`,
                method: 'PATCH',
                body: {
                    json,
                    title,
                    description,
                },
            }),
        }),
        getPageById: build.query<PageType, number>({
            query: (id) => ({
                url: `/pages/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const savePageDataMutation = pagesApi.endpoints.savePageData.initiate;

export const getPageByIdQuery = pagesApi.endpoints.getPageById.initiate;
