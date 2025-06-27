<?php

namespace App\Http\Controllers;

use App\Filters\FrontendWebsite\PageFilter;
use App\Http\Requests\StorePageRequest;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('modules/page/index', [
            'filters' => $request->all(['search', 'status', 'per_page']),
            'pages' => Page::orderBy("id", "DESC")
                // ->filter($request->only(['search', 'status']))
                ->filter(new PageFilter($request))
                ->paginate($request->get('per_page') ?? 10)
                ->withQueryString(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('modules/page/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request)
    {
        Page::create($request->validated());
        return redirect()->route('pages.index')->with('success', 'Record created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
