<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;

class BlogCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */

    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        $id = $this->route('blog_category',0);
        $isPutMethod = $this->method() == "PUT";

       return [
           'title'        => ['required','string','max:255'],
           'slug'         => [$isPutMethod ? 'required' : 'nullable','string','max:255', Rule::unique("blog_categories", "slug")->ignore($id, "hash_id")],
           'description'  => ['nullable','string'],
           'image'        => ["nullable", 'image'],
           'status'       => ['required','in:1,0'],
           "seo_title"    => ['nullable', 'string', "max:70"],
           "seo_keywords" => ['nullable', 'string', "max:255"],
           "seo_description" => ['nullable', 'string', "max:160"],
       ];
    }


}
