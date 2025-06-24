import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem,Brand } from '@/types';
import {Head, router, Link} from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Brands',
        href: '/brands',
    },
];

export default function index({ brands }: { brands: Brand[] }) {
    const deleteBrand = (id:number) => {
        if (confirm('Are you sure you want to delete brand?')){
            router.delete(route('brands.destroy', {id}));
            toast.success('Brand Deleted Successfully');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands List" />
            <div className={'mt-8'}>
                <Link className={buttonVariants({ variant: 'outline' })} href="/brands/create"> Create Brand </Link>
            </div>
            <Table className={'mt-4'}>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Brand</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { brands.map((brand) => (
                        <TableRow key={brand.id}>
                            <TableCell>{brand.id}</TableCell>
                            <TableCell>{brand.name}</TableCell>
                            <TableCell>
                                <Link className={buttonVariants({ variant: "default" })} href={`/brands/${brand.id}/edit`}>Edit</Link>
                                <Button variant={'destructive'} className={'cursor-pointer'} onClick={() =>  deleteBrand(brand.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
        </AppLayout>
    );
}
