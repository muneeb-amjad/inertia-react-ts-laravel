import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { FormEventHandler } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import ImageUpload from '@/components/ui/image-upload';
import CKEditor from '@/components/ui/ckeditor';

interface BlogCategory {
    id: number;
    parent_id: number | null;
    title: string;
    slug: string;
    image: string;
    image_url?: string;
    description: string;
    status: string | number;
    seo_title: string;
    seo_keywords: string;
    seo_description: string;
}

interface ParentCategory {
    id: number;
    title: string;
}

type SharedData = {
    parentCategories: ParentCategory[];
    category?: BlogCategory;
};

export default function BlogCategoryForm() {
    const { parentCategories, category } = usePage<SharedData>().props;
    const isEditing = !!category;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Blog Categories', href: '/blog-categories' },
        {
            title: isEditing ? 'Edit Category' : 'Create Category',
            href: isEditing ? `/blog-categories/${category.id}/edit` : '/blog-categories/create'
        },
    ];

    const { data, setData, errors, post, put, reset, processing } = useForm({
        title: category?.title || '',
        slug: category?.slug || '',
        image: null as File | null,
        description: category?.description || '',
        status: category?.status === 1 || category?.status === '1' ? '1' : '0',
        seo_title: category?.seo_title || '',
        seo_keywords: category?.seo_keywords || '',
        seo_description: category?.seo_description || ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('Form data being sent:', data);
        console.log('Current errors:', errors);

        if (isEditing) {
            // For updates with file uploads, use router.post with _method spoofing
            router.post(route('blog-categories.update', category.id), {
                _method: 'put',
                ...data,
            }, {
                preserveScroll: true,
                onError: (errors) => {
                    console.log("Update errors:", errors);
                },
                onSuccess: (page) => {
                    console.log("Update successful:", page);
                }
            });
        } else {
            post(route('blog-categories.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                },
                onError: (errors) => {
                    console.log("Create errors:", errors);
                },
            });
        }
    };

    // Generate slug from title
    const handleTitleChange = (value: string) => {
        setData('title', value);

        if (!data.slug || !isEditing) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setData('slug', slug);
        }
    };

    const seoTitleCount = data.seo_title.length;
    const seoDescriptionCount = data.seo_description.length;
    const isSeotitleOverLimit = seoTitleCount > 70;
    const isSeoDescriptionOverLimit = seoDescriptionCount > 160;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? "Edit Blog Category" : "Create Blog Category"} />
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                {/* Debug: Show all errors */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="text-red-800 font-semibold mb-2">Validation Errors:</h4>
                        <ul className="text-red-700 text-sm">
                            {Object.entries(errors).map(([key, message]) => (
                                <li key={key} className="mb-1">
                                    <strong>{key}:</strong> {message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center w-full">
                            <div className="h-14 flex-none flex items-center justify-center">
                                <CardTitle>{isEditing ? "Edit Blog Category" : "Create Blog Category"}</CardTitle>
                            </div>
                            <div className="h-14 flex-none flex items-center justify-center">
                                <Link
                                    className={buttonVariants({ variant: 'outline', size: 'sm' })}
                                    href={route('blog-categories.index')}
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Link>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-8">
                            {/* Basic Information */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Title */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) => handleTitleChange(e.target.value)}
                                            className={errors.title ? 'border-red-500' : ''}
                                            placeholder="Enter category title"
                                            required
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    {/* Slug */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="slug">Slug *</Label>
                                        <Input
                                            id="slug"
                                            name="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            className={errors.slug ? 'border-red-500' : ''}
                                            placeholder="category-slug"
                                            required
                                        />
                                        <InputError message={errors.slug} />
                                    </div>

                                    {/* Status */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status *</Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) => setData('status', value)}
                                        >
                                            <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="1">Active</SelectItem>
                                                    <SelectItem value="0">Inactive</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <ImageUpload
                                    label="Featured Image"
                                    name="image"
                                    value={data.image}
                                    currentImageUrl={category?.image_url}
                                    onChange={(file) => setData('image', file)}
                                    error={errors.image}
                                    className="mt-6"
                                />

                                {/* Description with CKEditor */}
                                <div className="mt-6">
                                    <CKEditor
                                        label="Description"
                                        name="description"
                                        value={data.description}
                                        onChange={(value) => setData('description', value)}
                                        error={errors.description}
                                        placeholder="Enter category description..."
                                        height={300}
                                        config={{
                                            toolbar: [
                                                'heading',
                                                '|',
                                                'bold',
                                                'italic',
                                                '|',
                                                'bulletedList',
                                                'numberedList',
                                                '|',
                                                'link',
                                                'blockQuote',
                                                '|',
                                                'undo',
                                                'redo'
                                            ]
                                        }}
                                    />
                                </div>
                            </div>

                            {/* SEO Settings */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* SEO Title */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="seo_title">SEO Title</Label>
                                        <Input
                                            id="seo_title"
                                            name="seo_title"
                                            value={data.seo_title}
                                            onChange={(e) => setData('seo_title', e.target.value)}
                                            className={errors.seo_title || isSeotitleOverLimit ? 'border-red-500' : ''}
                                            placeholder="Custom title for search engines"
                                        />
                                        <div className="flex justify-between items-center">
                                            <span className={`text-sm ${isSeotitleOverLimit ? 'text-red-600' : seoTitleCount > 60 ? 'text-orange-600' : 'text-gray-500'}`}>
                                                {seoTitleCount}/70
                                            </span>
                                        </div>
                                        <InputError message={errors.seo_title} />
                                    </div>

                                    {/* SEO Keywords */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="seo_keywords">SEO Keywords</Label>
                                        <Input
                                            id="seo_keywords"
                                            name="seo_keywords"
                                            value={data.seo_keywords}
                                            onChange={(e) => setData('seo_keywords', e.target.value)}
                                            className={errors.seo_keywords ? 'border-red-500' : ''}
                                            placeholder="keyword1, keyword2, keyword3"
                                        />
                                        <InputError message={errors.seo_keywords} />
                                    </div>
                                </div>

                                {/* SEO Description */}
                                <div className="grid gap-2 mt-6">
                                    <Label htmlFor="seo_description">SEO Description</Label>
                                    <textarea
                                        id="seo_description"
                                        name="seo_description"
                                        value={data.seo_description}
                                        onChange={(e) => setData('seo_description', e.target.value)}
                                        placeholder="Description that appears in search results"
                                        rows={3}
                                        className={`flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical transition-colors ${errors.seo_description || isSeoDescriptionOverLimit ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm ${isSeoDescriptionOverLimit ? 'text-red-600' : seoDescriptionCount > 150 ? 'text-orange-600' : 'text-gray-500'}`}>
                                            {seoDescriptionCount}/160
                                        </span>
                                    </div>
                                    <InputError message={errors.seo_description} />
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-4">
                                <Link
                                    className={buttonVariants({ variant: 'outline' })}
                                    href="/blog-categories"
                                >
                                    Cancel
                                </Link>
                                <Button disabled={processing} type="submit">
                                    {processing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            {isEditing ? 'Updating...' : 'Creating...'}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            {isEditing ? 'Update Category' : 'Create Category'}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
