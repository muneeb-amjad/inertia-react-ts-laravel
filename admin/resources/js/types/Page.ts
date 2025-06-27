export interface Page {
    id:number
    hash_id:string
    title?: string;
    slug?: string;
    description?: string;
    status?: string;
    seo_title?: string;
    seo_keywords?: string
    seo_description?: string
    created_at:string
    updated_at?: string
}

