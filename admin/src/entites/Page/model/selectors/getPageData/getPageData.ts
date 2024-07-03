import { buildSelector } from '@/shared/lib/store';

export const getPageData = (id: number) => {
    const [_, getData] = buildSelector((state) => state.pages?.[id]);
    return getData;
};
