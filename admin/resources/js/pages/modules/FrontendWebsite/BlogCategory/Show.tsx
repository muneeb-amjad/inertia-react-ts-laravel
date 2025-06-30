// BlogCategory/Show.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { type BreadcrumbItem } from '@/types';
import { BlogCategory } from '@/types/BlogCategory';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowLeft,
    Edit,
    Trash2,
    Calendar,
    Hash,
    Link as LinkIcon,
    Image as ImageIcon,
    Tag,
    FileText,
    Search,
    Globe
} from 'lucide-react';

interface ShowPageProps {
    category: BlogCategory;
}

export default function Show() {
    const { category } = usePage<ShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Blog Categories', href: '/blog-categories' },
        { title: category.title, href: '#' },
    ];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            router.delete(`/blog-categories/${category.id}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Category: ${category.title}`} />

            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-6">

                    {/* Header */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href="/blog-categories"
                                            className={buttonVariants({ variant: 'outline', size: 'sm' })}
                                        >
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back to Categories
                                        </Link>

                                        <Badge variant={category.status === '1' ? 'default' : 'secondary'}>
                                            {category.status === '1' ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>

                                    <div>
                                        <CardTitle className="text-3xl">{category.title}</CardTitle>
                                        {category.parent && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                Parent: <span className="font-medium">{category.parent.title}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/blog-categories/${category.id}/edit`}
                                        className={buttonVariants({ variant: 'outline' })}
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Link>

                                    <Button
                                        variant="destructive"
                                        onClick={handleDelete}
                                        disabled={category.children && category.children.length > 0}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Basic Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {category.description ? (
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Description</label>
                                            <p className="text-gray-900 mt-1 leading-relaxed">{category.description}</p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">No description provided</p>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                                <LinkIcon className="h-4 w-4" />
                                                Slug
                                            </label>
                                            <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                                                {category.slug}
                                            </code>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                                <Hash className="h-4 w-4" />
                                                Hash ID
                                            </label>
                                            <code className="text-sm bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                                                {category.hash_id}
                                            </code>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Featured Image */}
                            {category.image && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ImageIcon className="h-5 w-5" />
                                            Featured Image
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <img
                                                src={category.image}
                                                alt={category.title}
                                                className="w-full max-w-md rounded-lg border shadow-sm"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                            <p className="text-xs text-gray-500 break-all">{category.image}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* SEO Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Search className="h-5 w-5" />
                                        SEO Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {(category.seo_title || category.seo_description || category.seo_keywords) ? (
                                        <>
                                            {category.seo_title && (
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">SEO Title</label>
                                                    <p className="text-gray-900 mt-1">{category.seo_title}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {category.seo_title.length} characters
                                                    </p>
                                                </div>
                                            )}

                                            {category.seo_description && (
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">SEO Description</label>
                                                    <p className="text-gray-900 mt-1">{category.seo_description}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {category.seo_description.length} characters
                                                    </p>
                                                </div>
                                            )}

                                            {category.seo_keywords && (
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">SEO Keywords</label>
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {category.seo_keywords.split(',').map((keyword, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                {keyword.trim()}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* SEO Preview */}
                                            <div className="border rounded-lg p-4 bg-gray-50 mt-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                                    <Globe className="h-4 w-4" />
                                                    Search Engine Preview
                                                </h4>
                                                <div className="space-y-1">
                                                    <div className="text-blue-600 text-lg leading-tight">
                                                        {category.seo_title || category.title}
                                                    </div>
                                                    <div className="text-green-700 text-sm">
                                                        https://yoursite.com/categories/{category.slug}
                                                    </div>
                                                    <div className="text-gray-600 text-sm leading-normal">
                                                        {category.seo_description || category.description || 'No description available'}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-gray-500 italic">No SEO information provided</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">

                            {/* Category Hierarchy */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Tag className="h-5 w-5" />
                                        Category Hierarchy
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {category.parent ? (
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Parent Category</label>
                                            <Link
                                                href={`/blog-categories/${category.parent.id}`}
                                                className="block text-blue-600 hover:text-blue-800 mt-1"
                                            >
                                                {category.parent.title}
                                            </Link>
                                        </div>
                                    ) : (
                                        <div>
                                            <Badge variant="outline">Root Category</Badge>
                                        </div>
                                    )}

                                    {category.children && category.children.length > 0 && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">
                                                Subcategories ({category.children.length})
                                            </label>
                                            <div className="mt-2 space-y-1">
                                                {category.children.map((child) => (
                                                    <Link
                                                        key={child.id}
                                                        href={`/blog-categories/${child.id}`}
                                                        className="block text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        {child.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Metadata */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Metadata
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Created</label>
                                        <p className="text-sm text-gray-900 mt-1">
                                            {formatDate(category.created_at)}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Last Updated</label>
                                        <p className="text-sm text-gray-900 mt-1">
                                            {formatDate(category.updated_at)}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Status</label>
                                        <div className="mt-1">
                                            <Badge variant={category.status === '1' ? 'default' : 'secondary'}>
                                                {category.status === '1' ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Link
                                        href={`/blog-categories/${category.id}/edit`}
                                        className={buttonVariants({ variant: 'outline', className: 'w-full justify-start' })}
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Category
                                    </Link>

                                    <Link
                                        href="/blog-categories/create"
                                        className={buttonVariants({ variant: 'outline', className: 'w-full justify-start' })}
                                    >
                                        <Tag className="h-4 w-4 mr-2" />
                                        Create New Category
                                    </Link>

                                    {(!category.children || category.children.length === 0) && (
                                        <Button
                                            variant="destructive"
                                            className="w-full justify-start"
                                            onClick={handleDelete}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete Category
                                        </Button>
                                    )}

                                    {category.children && category.children.length > 0 && (
                                        <div className="text-xs text-gray-500 p-2 bg-yellow-50 rounded border border-yellow-200">
                                            Cannot delete category with subcategories
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
