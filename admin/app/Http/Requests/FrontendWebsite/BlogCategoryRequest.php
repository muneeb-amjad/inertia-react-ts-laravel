<?php

namespace App\Http\Requests\FrontendWebsite;

use App\Models\FrontendWebsite\BlogCategory;
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
     */
    public function rules(): array
    {
        $isUpdate = $this->route('blog_category') !== null;
        $categoryId = $isUpdate ? $this->route('blog_category')->id : null;

        return [
            'parent_id' => [
                'nullable',
                'exists:blog_categories,id',
                // For updates, ensure category can't be its own parent
                $isUpdate ? Rule::notIn([$categoryId]) : '',
            ],
            'title' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                // For updates, ignore current record's slug
                $isUpdate
                    ? Rule::unique('blog_categories', 'slug')->ignore($categoryId)
                    : 'unique:blog_categories,slug',
            ],
            'image' => 'nullable|url|max:500',
            'description' => 'nullable|string|max:1000',
            'status' => 'required|in:0,1',
            'seo_title' => 'nullable|string|max:70',
            'seo_keywords' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:160',
        ];
    }

    /**
     * Get custom validation messages.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The category title is required.',
            'title.max' => 'The category title may not be greater than 255 characters.',
            'slug.unique' => 'This slug is already taken.',
            'slug.regex' => 'The slug must only contain lowercase letters, numbers, and hyphens.',
            'parent_id.exists' => 'The selected parent category does not exist.',
            'parent_id.not_in' => 'A category cannot be its own parent.',
            'status.required' => 'Please select a status.',
            'status.in' => 'Status must be either 0 (inactive) or 1 (active).',
            'image.url' => 'The featured image must be a valid URL.',
            'image.max' => 'The featured image URL is too long.',
            'description.max' => 'The description may not be greater than 1000 characters.',
            'seo_title.max' => 'SEO title should not exceed 70 characters.',
            'seo_keywords.max' => 'SEO keywords should not exceed 255 characters.',
            'seo_description.max' => 'SEO description should not exceed 160 characters.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->parent_id === '' || $this->parent_id === '0') {
            $this->merge(['parent_id' => null]);
        }

        if (is_string($this->status)) {
            $this->merge(['status' => (int) $this->status === '1' ? 1 : 0]);
        }

        if (!in_array($this->status, [0, 1], true)) {
            $this->merge(['status' => 1]);
        }

        if (empty($this->slug) && !empty($this->title)) {
            $this->merge([
                'slug' => \Illuminate\Support\Str::slug($this->title)
            ]);
        }

        if ($this->image && filter_var($this->image, FILTER_VALIDATE_URL) === false) {
            $this->merge(['image' => null]);
        }
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // Custom validation: prevent circular parent-child relationships
            if ($this->parent_id && $this->route('blog_category')) {
                $currentCategory = $this->route('blog_category');

                // Check if the selected parent is a descendant of current category
                if ($this->wouldCreateCircularReference($currentCategory->id, $this->parent_id)) {
                    $validator->errors()->add(
                        'parent_id',
                        'Cannot set this category as parent because it would create a circular reference.'
                    );
                }
            }

            // Validate slug format more strictly
            if ($this->slug) {
                if (preg_match('/^-|-$/', $this->slug)) {
                    $validator->errors()->add('slug', 'Slug cannot start or end with a hyphen.');
                }
                if (preg_match('/--/', $this->slug)) {
                    $validator->errors()->add('slug', 'Slug cannot contain consecutive hyphens.');
                }
            }
        });
    }

    /**
     * Check if setting a parent would create a circular reference.
     */
    private function wouldCreateCircularReference(int $categoryId, int $proposedParentId): bool
    {
        $parent = BlogCategory::find($proposedParentId);

        while ($parent) {
            if ($parent->id == $categoryId) {
                return true; // Circular reference detected
            }
            $parent = $parent->parent;
        }

        return false;
    }
}
