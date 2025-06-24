<?php

namespace App\Http\Controllers;

use App\Filters\BlogFilter;
use App\helpers\MediaHelper;
use App\Http\Requests\BlogRequest;
use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        permissionCheck('blog');
        return view('modules.blog.index');
    }

    public function list(Request $request)
    {
        $pageSize = $request->get("pageSize", 20);
        $filters  = new BlogFilter($request);
        $list_all = Blog::filter($filters)->orderBy("id", "DESC")->with('category')->paginate($pageSize);
        $view = view("modules.blog.cdt", [
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
        permissionCheck('blog');
        $categories = BlogCategory::where('status', '1')->orderBy('title')->get();
        return view('modules.blog.add_edit', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BlogRequest $request)
    {
        permissionCheckJson($request, 'blog');
        $obj = Blog::create($this->getCrudInputs($request));

        $this->saveMedia($obj, $request, "thumbnail");
        $this->saveMedia($obj, $request, "image");
        $this->saveMedia($obj, $request, "image_2");
        $this->saveMedia($obj, $request, "image_3");

        session()->flash('success', "Blog is created successfully");
        return jsonLink(asset("blogs"));
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
        permissionCheck('blog');
        $row_details = Blog::where("hash_id", $id)->first();
        if ($row_details) {
            $categories = BlogCategory::where('status', '1')->orderBy('title')->get();
            return view('modules.blog.add_edit', [
                'row_details' => $row_details,
                'categories' => $categories
            ]);
        }
        abort(404);
        return null;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BlogRequest $request, string $id)
    {
        permissionCheckJson($request, 'blog');
        $row_details = Blog::where("hash_id", $id)->first();
        if ($row_details) {
            $data = $this->getCrudInputs($request);
            $data['slug'] = Str::slug($request->slug);
            $row_details->update($data);

            $remove_media = ["remove_thumbnail", "remove_image", "remove_image_1", "remove_image_2"];
            foreach ($remove_media as $each_media) {
                if ($request->get($each_media) == 1) {
                    $inputName = str_replace("remove_", "", $each_media);
                    MediaHelper::removeParentMedia($row_details->$inputName);
                    $row_details->update([$inputName => null]);
                }
            }

            $this->saveMedia($row_details, $request, "thumbnail");
            $this->saveMedia($row_details, $request, "image");
            $this->saveMedia($row_details, $request, "image_2");
            $this->saveMedia($row_details, $request, "image_3");

            session()->flash('success', "Blog is updated successfully");
            return jsonLink(asset("blogs"));
        }
        return message("Blog does not found", 401) ;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    /**
     * @param Blog $obj
     * @param Request $request
     * @param string $inputName
     */
    private function saveMedia(Blog $obj, Request $request, string $inputName)
    {
        if ($request->hasFile($inputName)) {
            if ($obj->$inputName) {
                MediaHelper::removeParentMedia($obj->$inputName);
            }

            if (in_array($inputName, ['thumbnail', 'image']))
                $slug = "blog/$inputName/$obj->slug";
            else {

                $slug = "blog/image/$obj->slug-".str_replace("image_", "", $inputName);
            }

            MediaHelper::uploadParentMedia($request->file($inputName), $slug, $slug);
            $obj->update([
                $inputName => $slug
            ]);
        }
    }

    private function getCrudInputs(Request $request)
    {
        return [
            "category_id" => $request->category,
            "title" => $request->title,
            "excerpt" => $request->excerpt,
            "tags" => $request->tags,
            "description" => $request->description,
            "position" => $request->position,
            "status" => $request->status,
            "display_order" => $request->display_order,
            "seo_title" => $request->seo_title,
            "seo_keywords" => $request->seo_keywords,
            "seo_description" => $request->seo_description,
        ];
    }

}
