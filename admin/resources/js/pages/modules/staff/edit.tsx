import { Card } from '@/components/ui/card'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react'


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Staff',
        href: '/staff-users/create',
    },
];

export default function edit() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Staff" />
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <Card>
                    <h1 className='ml-4 text-rose-500'>Coming soon</h1>
                </Card>
            </div>
        </AppLayout>
    )
}
