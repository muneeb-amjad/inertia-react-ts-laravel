import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Brand } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Brands', href: '/brands' },
];

export default function Index({ brands }: { brands: Brand[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands List" />

            <div className="mt-10 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Brands</h2>
                    <p className="text-sm text-muted-foreground">Manage and edit all available brands.</p>
                </div>
                <Link
                    className={buttonVariants({ variant: 'default' }) + ' px-5 py-2 shadow-sm'}
                    href="/brands/create"
                >
                    + Create Brand
                </Link>
            </div>

            <div className="rounded-xl border bg-white dark:bg-muted p-4 shadow-md">
                <DataTable columns={columns} data={brands} />
            </div>

        </AppLayout>
    );
}
