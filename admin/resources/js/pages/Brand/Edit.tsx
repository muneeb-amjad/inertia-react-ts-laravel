import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/types';

type EditBrandForm = {
    name?: string;
};

export default function Edit({ brand } : {brand:Brand}) {
    const brandName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm<EditBrandForm>({
        name: brand.name || '',
    });

    const updateBrand: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('brands.update', brand.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.name) {
                    brandName.current?.focus(); // focus the field
                }
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Brand" />
            <div className="flex h-full flex-1 gap-4 rounded-xl p-4">
                <form onSubmit={updateBrand} className="space-y-6">
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
                        <Button disabled={processing}>Update Brand</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
