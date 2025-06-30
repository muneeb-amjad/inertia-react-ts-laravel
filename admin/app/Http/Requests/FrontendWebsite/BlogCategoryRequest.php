<?php

namespace App\Http\Requests\FrontendWebsite;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlogCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $categoryId = $this->route('blogCategory')?->id;

        $rules = [
            'title' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('blog_categories', 'slug')->ignore($categoryId),
            ],
            'parent_id' => 'nullable|exists:blog_categories,id',
            'description' => 'nullable|string|max:1000',
            'status' => 'required|boolean',
            'seo_title' => 'nullable|string|max:70',
            'seo_keywords' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:160',
        ];

        // Add image validation rules
        if ($this->hasFile('image')) {
            $rules['image'] = 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:5120'; // 5MB max
        }

        return $rules;
    }

    /**
     * Get custom validation messages.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The category title is required.',
            'title.max' => 'The category title cannot exceed 255 characters.',
            'slug.required' => 'The slug is required.',
            'slug.unique' => 'This slug is already taken.',
            'slug.regex' => 'The slug must contain only lowercase letters, numbers, and hyphens.',
            'parent_id.exists' => 'The selected parent category does not exist.',
            'status.required' => 'Please select a status for the category.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a JPEG, PNG, GIF, or WebP file.',
            'image.max' => 'The image size cannot exceed 5MB.',
            'seo_title.max' => 'The SEO title cannot exceed 70 characters.',
            'seo_keywords.max' => 'The SEO keywords cannot exceed 255 characters.',
            'seo_description.max' => 'The SEO description cannot exceed 160 characters.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Convert status to boolean
        if ($this->has('status')) {
            $this->merge([
                'status' => $this->boolean('status'),
            ]);
        }

        // Convert parent_id to null if it's '0'
        if ($this->has('parent_id') && $this->input('parent_id') === '0') {
            $this->merge([
                'parent_id' => null,
            ]);
        }
    }
}
