export interface PageJson {
    jsonSection?: string;
}

export interface PageType {
    id: number;
    title?: string;
    description?: string;
    json?: PageJson;
}

export type PageSchema = Record<string, PageType>;
