import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Button } from '@/components/ui/button';

type CreateBrandForm = {
    name?: string;
};

export default function Create() {
    const brandName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing } = useForm<Required<CreateBrandForm>>({
        name: '',
    });

    const createBrand: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('brands.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    brandName.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Create Brand" />
            <div className="flex h-full flex-1 gap-4 rounded-xl p-4">
                <form onSubmit={createBrand} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Brand Name*</Label>

                        <Input
                            id="name"
                            ref={brandName}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.name} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Create Brand</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
