<?php

namespace App\Http\Controllers\FrontendWebsite;

use App\Http\Controllers\Controller;
use App\Filters\BlogCategoryFilter;
use App\helpers\MediaHelper;
use App\Http\Requests\BlogCategoryRequest;
use App\Models\FrontendWebsite\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;


class BlogCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('BlogCategory/Index', [
            'blog-categories' => BlogCategory::all(),
        ]);
        return view('modules.blog-category.index');
    }

    public function list(Request $request)
    {
        $pageSize = $request->get("pageSize", 20);
        $filters  = new BlogCategoryFilter($request);
        $list_all = BlogCategory::filter($filters)->orderBy("id", "DESC")->paginate($pageSize);
        $view = view("modules.blog-category.cdt", [
            "list_all" => $list_all,
            "post_arr" => $request->all(),
        ])->render();
        return json(["view" => $view]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('modules.blog-category.add_edit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BlogCategoryRequest $request)
    {
        $obj = BlogCategory::create($this->getCrudInputs($request));
        $this->saveMedia($obj, $request, "image");
        session()->flash('success', "Blog category is created successfully");
        return jsonLink(asset("blog-categories"));
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
        $row_details = BlogCategory::where("hash_id", $id)->first();
        if ($row_details) {
            return view('modules.blog-category.add_edit', [
                'row_details' => $row_details
            ]);
        }
        abort(404);
        return null;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogCategoryRequest $request, string $id)
    {
        $row_details = BlogCategory::where("hash_id", $id)->first();
        if ($row_details) {
            $data = $this->getCrudInputs($request);
            $data['slug'] = Str::slug($request->slug);
            $row_details->update($data);

            $remove_media = ["remove_image"];
            foreach ($remove_media as $each_media) {
                if ($request->get($each_media) == 1) {
                    $inputName = str_replace("remove_", "", $each_media);
                    MediaHelper::removeParentMedia($row_details->$inputName);
                    $row_details->update([$inputName => null]);
                }
            }

            $this->saveMedia($row_details, $request, "image");
            session()->flash('success', "Blog category is updated successfully");
            return jsonLink(asset("blog-categories"));
        }
        return message("Blog category does not found", 401) ;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * @param BlogCategory $obj
     * @param Request $request
     * @param string $inputName
     */
    private function saveMedia(BlogCategory $obj, Request $request, string $inputName)
    {
        if ($request->hasFile($inputName)) {
            if ($obj->$inputName) {
                MediaHelper::removeParentMedia($obj->$inputName);
            }

            $slug = "blog-category/$obj->slug";

            MediaHelper::uploadParentMedia($request->file($inputName), $slug, $slug);
            $obj->update([
                $inputName => $slug
            ]);
        }
    }

    private function getCrudInputs(Request $request)
    {
        return [
            "title" => $request->title,
            "description" => $request->description,
            "status" => $request->status,
            "seo_title" => $request->seo_title,
            "seo_keywords" => $request->seo_keywords,
            "seo_description" => $request->seo_description,
        ];
    }

}
