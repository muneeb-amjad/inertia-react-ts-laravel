import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Pencil, Search, Trash, X } from 'lucide-react';
import Pagination from '@/components/pagination';
import { StaffType } from '@/types/StaffType';
import { Input } from "@/components/ui/input";
import AppLayout from '@/layouts/app-layout';
import { useState, useEffect } from 'react';
import { PaginatedData } from '@/types';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Staff Users',
        href: '/staff-users',
    },
];

export default function index() {
    
    const { staff, filters, flash } = usePage<{
        staff: PaginatedData<StaffType>,
        filters: {
            search?: string;
            status?: string;
            per_page?: string;
        }
    }>().props;


    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [selectedStatus, setSelectedStatus] = useState(filters?.status || 'all');
    const [selectedPerPage, setSelectedPerPage] = useState(filters?.per_page || '10');
    
    // Track if this is the initial load
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Only trigger search after initial load is complete
    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            return; // Don't search on initial load
        }

        const timeoutId = setTimeout(() => {
            handleSearch(true); // Reset to page 1 when filters change
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [selectedStatus, selectedPerPage]);
    // }, [searchTerm, selectedStatus, selectedPerPage]);

    // Sync local state with URL parameters on page load
    useEffect(() => {
        setSearchTerm(filters?.search || '');
        setSelectedStatus(filters?.status || 'all');
        setSelectedPerPage(filters?.per_page || '10');
    }, [filters]);

    const handleSearch = (resetPage = true) => {
        const params: any = {};
        
        if (searchTerm.trim()) {
            params.search = searchTerm.trim();
        }
        
        if (selectedStatus !== 'all') {
            params.status = selectedStatus;
        }
        
        if (selectedPerPage !== '10') {
            params.per_page = selectedPerPage;
        }


        // if (resetPage) {
        //     params.page = 1;
        // }

        router.get('/staff-users', params, {
            preserveState: true,
            preserveScroll: true,
            only: ['staff'], 
        });
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSelectedStatus('all');
        setSelectedPerPage('10');
        
        // Navigate to clear all filters and reset to page 1
        router.get('/staff-users', {}, {
            preserveState: true,
            preserveScroll: true,
            only: ['staff'],
        });
    };

    const handleStatusChange = (value: string) => setSelectedStatus(value);
    const handlePerPageChange = (value: string) => setSelectedPerPage(value);



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Users" />
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <div className="h-14 flex-none flex items-center justify-center">
                                <CardTitle>Staff User List</CardTitle>
                            </div>
                            <div className="h-14 flex-none flex items-center justify-center">
                                <Link className={buttonVariants({ variant: 'outline' })} href="/staff-users/create">
                                    Create Staff
                                </Link>
                            </div>
                        </div>

                        <div className="flex mt-3 gap-2">
                            <div className="flex-none">
                                <Select value={selectedPerPage} onValueChange={handlePerPageChange}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Pagination" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Records per page</SelectLabel>
                                            <SelectItem value="10">Show 10</SelectItem>
                                            <SelectItem value="20">Show 20</SelectItem>
                                            <SelectItem value="50">Show 50</SelectItem>
                                            <SelectItem value="100">Show 100</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="flex-none">
                                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Status</SelectLabel>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="1">Active</SelectItem>
                                            <SelectItem value="0">Inactive</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <Input 
                                            type="text" 
                                            placeholder="Search..." 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pr-8"
                                        />
                                        {searchTerm && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                                onClick={() => setSearchTerm('')}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => handleSearch(true)}
                                        className="flex-none"
                                    >
                                        <Search className="h-4 w-4" />
                                    </Button>
                                    {(searchTerm || selectedStatus !== 'all' || selectedPerPage !== '10') && (
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={handleClearSearch}
                                            className="flex-none"
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {(searchTerm || selectedStatus !== 'all') && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {searchTerm && (
                                    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                                        Search: "{searchTerm}"
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 hover:bg-blue-200"
                                            onClick={() => setSearchTerm('')}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                                {selectedStatus !== 'all' && (
                                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                                        Status: {selectedStatus === '1' ? 'Active' : 'Inactive'}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 hover:bg-green-200"
                                            onClick={() => setSelectedStatus('all')}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardHeader>
                    
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Date added</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {staff?.data?.length > 0 ? (
                                    staff.data.map((data) => (
                                        <TableRow key={data.id}>
                                            <TableCell className="font-medium">
                                                {data.first_name} {data.last_name}
                                            </TableCell>
                                            <TableCell>{data?.pharmacy_staff?.user_role?.title}</TableCell>
                                            <TableCell>
                                                {new Date(data.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    data.status === '1' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {data.status === '1' ? 'Active' : 'Inactive'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link 
                                                        className={buttonVariants({ variant: 'outline', size: 'sm' })} 
                                                        href={`/staff-users/${data.id}/edit`}
                                                    >
                                                        <Pencil className="h-4 w-4 text-blue-600" />
                                                    </Link>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to delete this staff member?')) {
                                                                router.delete(`/staff-users/${data.id}`);
                                                            }
                                                        }}
                                                    >
                                                        <Trash className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            {searchTerm || selectedStatus !== 'all' 
                                                ? 'No staff members found matching your criteria.' 
                                                : 'No staff members found.'
                                            }
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Pagination pagination={staff} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}