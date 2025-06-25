import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Head, Link, router } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { type BreadcrumbItem, Brand } from '@/types';
import { Pencil, Trash } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import Pagination from '@/components/pagination';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Brands', href: '/brands' },
];

export default function Index({ brands }: { brands: { data: Brand[] } }) {
    const handleDelete = (brand: Brand) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            router.delete(`/brands/${brand.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands List" />
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <CardTitle>Brands</CardTitle>
                            <Link className={buttonVariants({ variant: 'outline' })} href="/brands/create">
                                Create Brand
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Brand Name</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {brands.data.length > 0 ? (
                                    brands.data.map((brand) => (
                                        <TableRow key={brand.id}>
                                            <TableCell className="font-medium">{brand.id}</TableCell>
                                            <TableCell>{brand.name}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        className={buttonVariants({ variant: 'outline', size: 'sm' })}
                                                        href={`/brands/${brand.id}/edit`}
                                                    >
                                                        <Pencil className="h-4 w-4 text-blue-600" />
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(brand)}
                                                    >
                                                        <Trash className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                                            No brands found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Pagination pagination={brands} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
