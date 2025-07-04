import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Head, Link, router, usePage } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import PaginationComponent from '@/components/pagination';
import { useState, useEffect, useCallback } from 'react';
import { PaginatedData } from '@/types';

// Import our generic CRUD components
import { CrudFilters } from '@/components/crud/CrudFilters';
import { CrudTable } from '@/components/crud/CrudTable';

interface BlogCategory {
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

interface ParentCategory {
    id: number;
    title: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog Categories', href: '/blog-categories' },
];

export default function Index() {
    const { categories, filters, parentCategories } = usePage<{
        categories: PaginatedData<BlogCategory>,
        filters: {
            search?: string;
            status?: string;
            parent_id?: string;
            per_page?: string;
        },
        parentCategories: ParentCategory[]
    }>().props;

    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters?.status || 'all');
    const [selectedParent, setSelectedParent] = useState(filters?.parent_id || 'all');
    const [selectedPerPage, setSelectedPerPage] = useState(filters?.per_page || '10');
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const handleSearch = useCallback(() => {
        const params: Record<string, string> = {};

        if (searchTerm.trim()) {
            params.search = searchTerm.trim();
        }

        if (selectedStatus !== 'all') {
            params.status = selectedStatus;
        }

        if (selectedParent !== 'all') {
            params.parent_id = selectedParent;
        }

        if (selectedPerPage !== '10') {
            params.per_page = selectedPerPage;
        }

        router.get('/blog-categories', params, {
            preserveState: true,
            preserveScroll: true,
            only: ['categories'],
        });
    }, [searchTerm, selectedStatus, selectedParent, selectedPerPage]);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        setSelectedStatus('all');
        setSelectedParent('all');
        setSelectedPerPage('10');

        router.get('/blog-categories', {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['categories'],
        });
    }, []);

    const handleDelete = useCallback((category: BlogCategory) => {
        router.delete(`/blog-categories/${category.id}`);
    }, []);

    // Only trigger search after initial load is complete
    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            handleSearch();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [selectedStatus, selectedParent, selectedPerPage, handleSearch, isInitialLoad]);

    // Sync local state with URL parameters on a page load
    useEffect(() => {
        setSearchTerm(filters?.search || '');
        setSelectedStatus(filters?.status || 'all');
        setSelectedParent(filters?.parent_id || 'all');
        setSelectedPerPage(filters?.per_page || '10');
    }, [filters]);

    // Check if any filters are active
    const hasActiveFilters = Boolean(
        searchTerm ||
        selectedStatus !== 'all' ||
        selectedParent !== 'all' ||
        selectedPerPage !== '10'
    );

    // Prepare filter tags
    const filterTags = [];
    if (searchTerm) {
        filterTags.push({
            key: 'search',
            label: 'Search',
            value: `"${searchTerm}"`,
            onRemove: () => setSearchTerm(''),
            colorClass: 'bg-blue-100 text-blue-800'
        });
    }
    if (selectedStatus !== 'all') {
        filterTags.push({
            key: 'status',
            label: 'Status',
            value: selectedStatus === '1' ? 'Active' : 'Inactive',
            onRemove: () => setSelectedStatus('all'),
            colorClass: 'bg-green-100 text-green-800'
        });
    }
    if (selectedParent !== 'all') {
        const parentName = selectedParent === 'root'
            ? 'Root Categories'
            : parentCategories.find(p => p.id.toString() === selectedParent)?.title || 'Unknown';
        filterTags.push({
            key: 'parent',
            label: 'Parent',
            value: parentName,
            onRemove: () => setSelectedParent('all'),
            colorClass: 'bg-purple-100 text-purple-800'
        });
    }

    const columns = [
        {
            key: 'title',
            header: 'Category',
            className: 'w-[60%]',
            render: (category: BlogCategory) => (
                <div>
                    <div className="font-medium text-gray-900">{category.title}</div>
                    {category.slug && (
                        <div className="text-sm text-gray-500 mt-1">
                            {category.slug}
                        </div>
                    )}
                </div>
            )
        },
        {
            key: 'status',
            header: 'Status',
            className: 'w-[20%]',
            render: (category: BlogCategory) => (
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    category.status === '1'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                }`}>
                    {category.status === '1' ? 'Active' : 'Inactive'}
                </span>
            )
        }
    ];

    // Define table actions
    const actions = [
        {
            type: 'edit' as const,
            href: (category: BlogCategory) => `/blog-categories/${category.id}/edit`
        },
        {
            type: 'delete' as const,
            onClick: handleDelete,
            confirmMessage: 'Are you sure you want to delete this category? This action cannot be undone.'
        }
    ];

    // Filter configuration
    const filterConfig = {
        search: {
            enabled: true,
            placeholder: 'Search categories...'
        },
        perPage: {
            enabled: true,
            options: [10, 20, 50, 100]
        },
        status: {
            enabled: true,
            options: [
                { value: 'all', label: 'All' },
                { value: '1', label: 'Active' },
                { value: '0', label: 'Inactive' }
            ],
            label: 'Status',
            placeholder: 'Status'
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Categories" />
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <div className="h-14 flex-none flex items-center justify-center">
                                <CardTitle>Blog Categories</CardTitle>
                            </div>
                            <div className="h-14 flex-none flex items-center justify-center">
                                <Link
                                    className={buttonVariants({ variant: 'outline' })}
                                    href="/blog-categories/create"
                                >
                                    Create Category
                                </Link>
                            </div>
                        </div>

                        <CrudFilters
                            searchValue={searchTerm}
                            onSearchChange={setSearchTerm}
                            perPageValue={selectedPerPage}
                            onPerPageChange={setSelectedPerPage}
                            statusValue={selectedStatus}
                            onStatusChange={setSelectedStatus}
                            onSearch={handleSearch}
                            onClear={handleClearSearch}
                            hasActiveFilters={hasActiveFilters}
                            filterTags={filterTags}
                            config={filterConfig}
                        />
                    </CardHeader>

                    <CardContent>
                        <CrudTable
                            data={categories?.data || []}
                            columns={columns}
                            actions={actions}
                            emptyMessage="No blog categories found."
                            emptyMessageWithFilters="No categories found matching your criteria."
                            hasActiveFilters={hasActiveFilters}
                        />

                        <PaginationComponent
                            pagination={categories}
                            filters={{
                                search: searchTerm,
                                status: selectedStatus,
                                parent_id: selectedParent,
                                per_page: selectedPerPage,
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
