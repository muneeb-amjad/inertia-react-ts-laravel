import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginatedData, type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Pencil, Plus, Search } from "lucide-react"
import AppLayout from '@/layouts/app-layout';
import { Input } from "@/components/ui/input"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button, buttonVariants } from '@/components/ui/button';
import { Page } from '@/types/Page';
import StatusSelect from "@/components/status-form";
import { useState } from "react";
import PaginationSelect from "@/components/pagination-select";
import { Pagination } from "@/components/ui/pagination";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pages',
        href: '/pages',
    },
];


export default function EditPharmacy() {
    const { pages, filters } = usePage<{
        pages: PaginatedData<Page>,
        filters: {
            search?: string;
            status?: string;
            per_page?: string;
        }
    }>().props;

    const [selectedPerPage, setSelectedPerPage] = useState(filters?.per_page || "10");
    const [selectedStatus, setSelectedStatus] = useState(filters?.status || 'all');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Page List" />
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">

                            <div className="h-14 flex-none flex items-center justify-center">
                                <CardTitle>Page List</CardTitle>
                            </div>
                            <div className="h-14 flex-none flex items-center justify-center">
                                <Link className={buttonVariants({ variant: 'outline' })} href="/pages/create">
                                    Create Page
                                    <Plus className="text-blue-800" />
                                </Link>
                            </div>
                        </div>

                        <div className="flex mt-3">
                            <div className="h-6 flex-none">
                                <PaginationSelect
                                    value={selectedPerPage}
                                    onValueChange={(value) => setSelectedPerPage(value)}
                                    placeholder="Records per page"
                                    width="w-full"
                                    label="Records per page"
                                    className="w-[200px]"
                                />
                            </div>
                            <div className="h-6 grow ml-1">
                                <StatusSelect
                                    value={selectedStatus}
                                    onValueChange={(value) => setSelectedStatus(value)}
                                    placeholder="Select a status"
                                    width="w-full"
                                    label="Select a status"
                                    className="w-[200px]"
                                />
                            </div>
                            <div className="h-6 flex-none ...">
                                <div className="relative flex w-full max-w-sm">
                                    <Input
                                        type="email"
                                        className="rounded-r-none border-r-0 pr-0 focus:z-10 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        placeholder="Search..."
                                    />
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        className="rounded-l-none -ml-px border-l-0 px-3 bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                                    >
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table className="border border-gray-200">
                            <TableHeader>
                                <TableRow className="border-b">
                                    <TableHead className="w-[900px] border-r">Title</TableHead>
                                    <TableHead className="w-[300px] border-r">Status</TableHead>
                                    <TableHead className="text-right w-[100px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pages.data.map((invoice) => (
                                    <TableRow key={invoice.id} className="border-b">
                                        <TableCell className="font-medium border-r">{invoice.title}</TableCell>
                                        <TableCell className="border-r">{invoice.status}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                                                    href={`/staff-users/1/edit`}
                                                >
                                                    <Pencil className="h-4 w-4 text-blue-600" />
                                                </Link>

                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination pagination={pages} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
