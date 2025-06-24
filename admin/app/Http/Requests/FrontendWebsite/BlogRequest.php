<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;

class BlogRequest extends FormRequest
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
        $id = $this->route('blog',0);
        $isPutMethod = $this->method() == "PUT";

       return [
           'title'           => ['required','string','max:255'],
           'excerpt'         => ['nullable','string','max:255'],
           'slug'            => [$isPutMethod ? 'required' : 'nullable', 'string', 'max:255', Rule::unique("blogs", "slug")->ignore($id, "hash_id")],
           'tags'            => ['nullable','string'],
           'description'     => ['nullable','string'],
           'thumbnail'       => ["nullable", 'image'],
           'image'           => ["nullable", 'image'],
           'image_2'         => ["nullable", 'image'],
           'image_3'         => ["nullable", 'image'],
           'display_order'   => ['required','numeric', 'min:1', 'max:100'],
           'status'          => ['required','in:1,0'],
           "seo_title"       => ['nullable', 'string', "max:255"],
           "seo_keywords"    => ['nullable', 'string', "max:100"],
           "seo_description" => ['nullable', 'string', "max:255"],
       ];
    }


}
