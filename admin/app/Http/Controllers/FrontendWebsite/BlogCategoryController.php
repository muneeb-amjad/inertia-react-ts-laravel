<?php

namespace App\Http\Controllers\FrontendWebsite;

use App\Http\Controllers\Controller;
use App\Filters\FrontendWebsite\BlogCategoryFilter;
use App\Http\Requests\FrontendWebsite\BlogCategoryRequest;
use App\Models\FrontendWebsite\BlogCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;


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
        BlogCategory::create($request->validated());

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
            'category' => $blogCategory,
            'parentCategories' => $parentCategories,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogCategoryRequest $request, BlogCategory $blogCategory)
    {
        $blogCategory->update($request->validated());

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

        $blogCategory->delete();

        return redirect()
            ->route('blog-categories.index')
            ->with('success', 'Blog category deleted successfully.');
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
}
