import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler, useRef } from 'react';
import StatusSelect from '@/components/status-form';
import RichTextEditor from '@/components/text-editor';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pages',
        href: '/pagese',
    },
    {
        title: 'Create',
        href: '/pages/create',
    },
];

export default function Create() {
    const titleInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing } = useForm({
        _method: 'POST',
        title: '',
        status: '',
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('pages.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.title) {
                    reset('title');
                    titleInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Page" />
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Page</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            ref={titleInput}
                                            onChange={(e) => setData('title', e.target.value)}
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            className={errors.title ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status *</Label>
                                        <StatusSelect
                                            value={data.status}
                                            onValueChange={(value) => setData('status', value)}
                                            placeholder="Select a status"
                                            className={errors.status ? 'border-red-500' : ''}
                                            width="w-full"
                                            label="Select a status"
                                            options={[
                                                { value: "1", label: "Active" },
                                                { value: "0", label: "Inactive" },
                                            ]}
                                        />
                                        <InputError message={errors.status} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <RichTextEditor
                                            value={data.description}
                                            onChange={(value) => setData('description', value)}
                                            placeholder="Write your page description here..."
                                            height="300px"
                                            className={errors.description ? 'border-red-500' : ''}
                                            disabled={processing}
                                        />
                                        <InputError message={errors.description} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Button disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}