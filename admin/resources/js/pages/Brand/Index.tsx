import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Head, Link, router, usePage } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { type BreadcrumbItem, Brand } from '@/types';
import AppLayout from '@/layouts/app-layout';
import Pagination from '@/components/pagination';
import { useState, useEffect, useCallback } from 'react';
import { PaginatedData } from '@/types';

// Import our generic CRUD components
import { CrudFilters } from '@/components/crud/CrudFilters';
import { CrudTable } from '@/components/crud/CrudTable';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Brands', href: '/brands' },
];

export default function Index() {
    const { brands, filters } = usePage<{
        brands: PaginatedData<Brand>,
        filters: {
            search?: string;
            per_page?: string;
        }
    }>().props;

    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [selectedPerPage, setSelectedPerPage] = useState(filters?.per_page || '10');
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Define all functions FIRST before any useEffect
    const handleSearch = useCallback(() => {
        const params: Record<string, string> = {};

        if (searchTerm.trim()) {
            params.search = searchTerm.trim();
        }

        if (selectedPerPage !== '10') {
            params.per_page = selectedPerPage;
        }

        router.get('/brands', params, {
            preserveState: true,
            preserveScroll: true,
            only: ['brands'],
        });
    }, [searchTerm, selectedPerPage]);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        setSelectedPerPage('10');

        router.get('/brands', {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['brands'],
        });
    }, []);

    const handleDelete = useCallback((brand: Brand) => {
        router.delete(`/brands/${brand.id}`);
    }, []);

    // NOW define useEffect hooks after functions are declared
    // Only trigger search after an initial load is complete
    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            handleSearch();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [selectedPerPage, handleSearch, isInitialLoad]);

    // Sync local state with URL parameters on page load
    useEffect(() => {
        setSearchTerm(filters?.search || '');
        setSelectedPerPage(filters?.per_page || '10');
    }, [filters]);

    // Check if any filters are active
    const hasActiveFilters = Boolean(searchTerm || selectedPerPage !== '10');

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

    // Define table columns
    const columns = [
        {
            key: 'id',
            header: 'ID',
            className: 'w-[100px]',
            render: (brand: Brand) => <span className="font-medium">{brand.id}</span>
        },
        {
            key: 'name',
            header: 'Brand Name'
        }
    ];

    // Define table actions
    const actions = [
        {
            type: 'edit' as const,
            href: (brand: Brand) => `/brands/${brand.id}/edit`
        },
        {
            type: 'delete' as const,
            onClick: handleDelete,
            confirmMessage: 'Are you sure you want to delete this brand?'
        }
    ];

    // Filter configuration
    const filterConfig = {
        search: {
            enabled: true,
            placeholder: 'Search brands...'
        },
        perPage: {
            enabled: true,
            options: [10, 20, 50, 100]
        },
        status: {
            enabled: false // No status filter for brands
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands List" />
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <div className="h-14 flex-none flex items-center justify-center">
                                <CardTitle>Brands</CardTitle>
                            </div>
                            <div className="h-14 flex-none flex items-center justify-center">
                                <Link className={buttonVariants({ variant: 'outline' })} href="/brands/create">
                                    Create Brand
                                </Link>
                            </div>
                        </div>

                        <CrudFilters
                            searchValue={searchTerm}
                            onSearchChange={setSearchTerm}
                            perPageValue={selectedPerPage}
                            onPerPageChange={setSelectedPerPage}
                            onSearch={handleSearch}
                            onClear={handleClearSearch}
                            hasActiveFilters={hasActiveFilters}
                            filterTags={filterTags}
                            config={filterConfig}
                        />
                    </CardHeader>

                    <CardContent>
                        <CrudTable
                            data={brands?.data || []}
                            columns={columns}
                            actions={actions}
                            emptyMessage="No brands found."
                            emptyMessageWithFilters="No brands found matching your criteria."
                            hasActiveFilters={hasActiveFilters}
                        />
                        <Pagination pagination={brands} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
