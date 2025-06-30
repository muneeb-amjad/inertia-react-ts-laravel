import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/types';
import { toast } from 'sonner';

type BrandFormPageProps = {
    brand?: Brand; // Provided only in edit mode
};

export default function BrandFormPage({ brand }: BrandFormPageProps) {
    const isEdit = !!brand;
    const brandName = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, put, reset, processing } = useForm({
        name: brand?.name || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const request = isEdit
            ? put(route('brands.update', brand.id))
            : post(route('brands.store'));

        const formData = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(isEdit ? 'Brand updated successfully' : 'Brand created successfully');
                reset();
            },
            onError: (errors: Partial<Record<keyof typeof data, string>>) => {
                if (errors.name) {
                    toast.error('Name is required');
                    brandName.current?.focus();
                }
            },
        };

        if(isEdit){
            put(route('brands.update', brand.id),formData)
        }
        else{
            post(route('brands.store'),formData);
        }

        // request(formData, isEdit);
    };

    return (
        <AppLayout>
            <Head title={isEdit ? 'Edit Brand' : 'Create Brand'} />
            <div className="flex h-full flex-1 gap-4 rounded-xl p-4">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Button disabled={processing}>
                            {isEdit ? 'Update Brand' : 'Create Brand'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
