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
        $perPage = in_array($request->get('per_page'), [10, 20, 50, 100]) ? $request->get('per_page') : 10;

        $categories = BlogCategory::filter($filters)
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('modules/FrontendWebsite/BlogCategory/Index', [
            'filters' => $request->all(['search', 'status', 'per_page']),
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('modules/FrontendWebsite/BlogCategory/FormPage', [
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
        return Inertia::render('modules/FrontendWebsite/BlogCategory/Show', [
            'category' => $blogCategory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogCategory $blogCategory)
    {
        return Inertia::render('modules/FrontendWebsite/BlogCategory/FormPage', [
            'category' => $blogCategory->append('image_url'),
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogCategoryRequest $request, BlogCategory $blogCategory)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            if ($blogCategory->image) {
                $this->deleteImage($blogCategory->image);
            }

            $validatedData['image'] = $this->handleImageUpload($request->file('image'));
        } else {
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
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $storagePath = 'blog-categories';
            $fullPath = $storagePath . '/' . $filename;
            if (!Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->makeDirectory($storagePath);
            }
            $file->storeAs($storagePath, $filename, 'public');
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
