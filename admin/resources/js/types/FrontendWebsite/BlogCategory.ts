export interface BlogCategory {
    id: number;
    parent_id: number | null;
    hash_id: string;
    title: string;
    slug: string;
    image: string | null;
    description: string | null;
    status: '0' | '1';
    seo_title: string | null;
    seo_keywords: string | null;
    seo_description: string | null;
    created_at: string;
    updated_at: string;

    parent?: BlogCategory;
    children?: BlogCategory[];

    full_path?: string;
}

export interface ParentCategory {
    id: number;
    title: string;
}

export interface BlogCategoryFormData {
    parent_id: string;
    title: string;
    slug: string;
    image: string;
    description: string;
    status: string;
    seo_title: string;
    seo_keywords: string;
    seo_description: string;
}

export interface BlogCategoryFilters {
    search?: string;
    status?: string;
    parent_id?: string;
    per_page?: string;
}

// For API responses
export interface BlogCategoryIndexPageProps {
    categories: PaginatedData<BlogCategory>;
    filters: BlogCategoryFilters;
    parentCategories: ParentCategory[];
}

export interface BlogCategoryFormPageProps {
    category?: BlogCategory;
    parentCategories: ParentCategory[];
}

// Status enum for better type safety
export enum BlogCategoryStatus {
    INACTIVE = '0',
    ACTIVE = '1'
}

// SEO configuration
export interface SEOLimits {
    title: {
        max: 70;
        recommended: { min: 50; max: 60 };
    };
    description: {
        max: 160;
        recommended: { min: 150; max: 160 };
    };
}

export const SEO_LIMITS: SEOLimits = {
    title: {
        max: 70,
        recommended: { min: 50, max: 60 }
    },
    description: {
        max: 160,
        recommended: { min: 150, max: 160 }
    }
};
