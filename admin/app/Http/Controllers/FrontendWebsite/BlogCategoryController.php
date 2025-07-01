<?php

namespace App\Http\Controllers\FrontendWebsite;

use App\Http\Controllers\Controller;
use App\Filters\FrontendWebsite\BlogCategoryFilter;
use App\Http\Requests\FrontendWebsite\BlogCategoryRequest;
use App\Models\FrontendWebsite\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;

class BlogCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, BlogCategoryFilter $filters)
    {
        $perPage = in_array($request->get('per_page'), [10, 20, 50, 100])
            ? $request->get('per_page')
            : 10;

        $categories = BlogCategory::with('parent')
            ->filter($filters)
            ->paginate($perPage)
            ->withQueryString();

        $parentCategories = BlogCategory::whereNull('parent_id')
            ->orderBy('title')
            ->get(['id', 'title']);

        return Inertia::render('modules/FrontendWebsite/BlogCategory/Index', [
            'filters' => $request->all(['search', 'status', 'parent_id', 'per_page']),
            'categories' => $categories,
            'parentCategories' => $parentCategories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $parentCategories = BlogCategory::whereNull('parent_id')
            ->orderBy('title')
            ->get(['id', 'title']);

        return Inertia::render('modules/FrontendWebsite/BlogCategory/FormPage', [
            'parentCategories' => $parentCategories,
            'isEdit' => false,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BlogCategoryRequest $request)
    {
        $validatedData = $request->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            $validatedData['image'] = $this->handleImageUpload($request->file('image'));
        }

        // Remove image from validated data if it's null (no file uploaded)
        if (!isset($validatedData['image'])) {
            unset($validatedData['image']);
        }

        BlogCategory::create($validatedData);

        return redirect()
            ->route('blog-categories.index')
            ->with('success', 'Blog category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogCategory $blogCategory)
    {
        $blogCategory->load('parent', 'children');

        return Inertia::render('modules/FrontendWebsite/BlogCategory/Show', [
            'category' => $blogCategory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogCategory $blogCategory)
    {
        $parentCategories = BlogCategory::where('id', '!=', $blogCategory->id)
            ->whereNull('parent_id')
            ->whereNotIn('id', $this->getDescendantIds($blogCategory))
            ->orderBy('title')
            ->get(['id', 'title']);

        return Inertia::render('modules/FrontendWebsite/BlogCategory/FormPage', [
            'category' => $blogCategory->append('image_url'),
            'parentCategories' => $parentCategories,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogCategoryRequest $request, BlogCategory $blogCategory)
    {
        $validatedData = $request->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($blogCategory->image) {
                $this->deleteImage($blogCategory->image);
            }

            $validatedData['image'] = $this->handleImageUpload($request->file('image'));
        } else {
            // Remove image from update data if no new file uploaded
            unset($validatedData['image']);
        }

        $blogCategory->update($validatedData);

        return redirect()
            ->route('blog-categories.index')
            ->with('success', 'Blog category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogCategory $blogCategory)
    {
        // Check if category has children
        if ($blogCategory->children()->exists()) {
            return redirect()
                ->route('blog-categories.index')
                ->with('error', 'Cannot delete category that has subcategories.');
        }

        // Delete associated image
        if ($blogCategory->image) {
            $this->deleteImage($blogCategory->image);
        }

        $blogCategory->delete();

        return redirect()
            ->route('blog-categories.index')
            ->with('success', 'Blog category deleted successfully.');
    }

    /**
     * Handle image upload with resizing and optimization
     */
    private function handleImageUpload($file)
    {
        try {
            // Generate unique filename
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

            // Define storage path (relative to storage/app/public)
            $storagePath = 'blog-categories';
            $fullPath = $storagePath . '/' . $filename;

            // Create directory if it doesn't exist
            if (!Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->makeDirectory($storagePath);
            }

            // Store the file
            $file->storeAs($storagePath, $filename, 'public');

            // Return the path without leading slash (for database storage)
            // This will be stored as "blog-categories/uuid.jpg"
            return $fullPath;

        } catch (\Exception $e) {
            \Log::error('Image upload failed: ' . $e->getMessage());
            throw new \Exception('Failed to upload image. Please try again.');
        }
    }

    /**
     * Delete image from storage
     */
    private function deleteImage($imagePath)
    {
        try {
            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        } catch (\Exception $e) {
            \Log::error('Image deletion failed: ' . $e->getMessage());
        }
    }

    /**
     * Get all descendant IDs of a category (to prevent circular references)
     */
    private function getDescendantIds(BlogCategory $category)
    {
        $descendants = collect();

        $children = $category->children;
        foreach ($children as $child) {
            $descendants->push($child->id);
            $descendants = $descendants->merge($this->getDescendantIds($child));
        }

        return $descendants->toArray();
    }

    /**
     * Get the full URL for an image
     */
    public function getImageUrl($imagePath)
    {
        if (!$imagePath) {
            return null;
        }

        return Storage::disk('public')->url($imagePath);
    }
}
