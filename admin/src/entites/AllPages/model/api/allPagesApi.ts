import { rtkApi } from '@/shared/api/rtkApi';
import { AllPagesSchema } from '../types/pageSchema';

const allPagesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPages: build.query<AllPagesSchema, void>({
            query: () => ({
                url: `/pages`,
                method: 'GET',
            }),
        }),
    }),
});

export const getAllPagesQuery = allPagesApi.endpoints.getAllPages.initiate;
