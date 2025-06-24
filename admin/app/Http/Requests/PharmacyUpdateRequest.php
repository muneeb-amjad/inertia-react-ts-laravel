<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PharmacyUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Basic Information - Required fields
            'pharmacy_name' => [
                'required',
                'string',
                'min:2',
                'max:255',
                'regex:/^[a-zA-Z0-9\s\-\.\&]+$/', // Alphanumeric, spaces, hyphens, dots, ampersands
            ],
            'business_name' => [
                'required',
                'string',
                'min:2',
                'max:255',
                'regex:/^[a-zA-Z0-9\s\-\.\&]+$/',
            ],

            // Basic Information - Optional fields
            'company_reg_no' => [
                'nullable',
                'string',
                'max:50',
            ],
            'company_register_in' => [
                'nullable',
                'string',
                'min:2',
                'max:100',
                'regex:/^[a-zA-Z\s\-]+$/', // Letters, spaces, hyphens only
            ],
            'superintendent' => [
                'nullable',
                'string',
                'min:2',
                'max:255',
                'regex:/^[a-zA-Z\s\-\.\']+$/', // Names with spaces, hyphens, dots, apostrophes
            ],
            'gphc_registration_number' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[0-9A-Z\-]+$/', // GPhC format: numbers, uppercase letters, hyphens
            ],
            'vat_number' => [
                'nullable',
                'string',
                // 'max:20',
                // 'regex:/^[A-Z]{2}[0-9A-Z]+$/', // VAT format: 2 letters followed by numbers/letters
            ],

            // Contact Information
            'contact_no' => [
                'nullable',
                'string',
                'min:10',
                'max:20',
                'regex:/^[\+]?[0-9\s\-\(\)]+$/', // Phone number format
            ],
            'fax_no' => [
                'nullable',
                'string',
                'min:10',
                'max:20',
                'regex:/^[\+]?[0-9\s\-\(\)]+$/',
            ],
            'primary_email' => [
                'nullable',
                'email:rfc,dns',
                'max:255',
            ],
            'website_url' => [
                'nullable',
                'url',
                'max:255',
                'regex:/^https?:\/\//', // Must start with http:// or https://
            ],
            'about_company' => [
                'nullable',
                'string',
                'max:2000',
                'min:10',
            ],

            // Address Information
            'address_1' => [
                'nullable',
                'string',
                'max:255',
                'min:5',
            ],
            'address_2' => [
                'nullable',
                'string',
                'max:255',
            ],
            'address_3' => [
                'nullable',
                'string',
                'max:255',
            ],
            'city_town' => [
                'nullable',
                'string',
                'max:100',
                'min:2',
                'regex:/^[a-zA-Z\s\-\'\.]+$/', // City names
            ],
            'county' => [
                'nullable',
                'string',
                'max:100',
                'regex:/^[a-zA-Z\s\-\'\.]+$/',
            ],
            'postcode' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[A-Z0-9\s\-]+$/i', // Postcodes
            ],
            'country_id' => [
                'nullable',
                'integer',
                'exists:countries,id',
                'min:1',
            ],
            'latitude' => [
                'nullable',
                'numeric',
                'between:-90,90',
            ],
            'longitude' => [
                'nullable',
                'numeric',
                'between:-180,180',
            ],

            // File Uploads
            'logo' => [
                'nullable',
                // 'image',
                // 'mimes:jpeg,png,jpg,gif,svg,webp',
                // 'max:2048', // 2MB
                // 'dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000',
            ],
            'logo_2' => [
                'nullable',
                // 'image',
                // 'mimes:jpeg,png,jpg,gif,svg,webp',
                // 'max:2048',
                // 'dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000',
            ],
            'fav_icon' => [
                'nullable',
                // 'file',
                // 'mimes:ico,png',
                // 'max:512', // 512KB for favicon
                // 'dimensions:max_width=256,max_height=256',
            ],
            'image' => [
                'nullable',
                // 'image',
                // 'mimes:jpeg,png,jpg,gif,webp',
                // 'max:5120', // 5MB for about us image
                // 'dimensions:min_width=300,min_height=200,max_width=3000,max_height=3000',
            ],

            // Social Media URLs
            'facebook' => [
                'nullable',
                // 'url',
                'max:255',
                // 'regex:/^https?:\/\/(www\.)?facebook\.com\//', // Facebook URL validation
            ],
            'twitter' => [
                'nullable',
                // 'url',
                'max:255',
                // 'regex:/^https?:\/\/(www\.)?(twitter\.com|x\.com)\//', // Twitter/X URL validation
            ],
            'linkedin' => [
                'nullable',
                // 'url',
                'max:255',
                // 'regex:/^https?:\/\/(www\.)?linkedin\.com\//', // LinkedIn URL validation
            ],
            'instagram' => [
                'nullable',
                // 'url',
                'max:255',
                // 'regex:/^https?:\/\/(www\.)?instagram\.com\//', // Instagram URL validation
            ],
            'youtube' => [
                'nullable',
                // 'url',
                'max:255',
                // 'regex:/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//', // YouTube URL validation
            ],

            // SEO Information
            'seo_title' => [
                'nullable',
                'string',
                'max:60', // SEO best practice: 50-60 characters
                'min:10',
            ],
            'seo_keywords' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[a-zA-Z0-9\s,\-]+$/', // Keywords separated by commas
            ],
            'seo_description' => [
                'nullable',
                'string',
                // 'max:160', // SEO best practice: 150-160 characters
                // 'min:50',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            // Basic Information
            'pharmacy_name.required' => 'Pharmacy name is required.',
            'pharmacy_name.regex' => 'Pharmacy name contains invalid characters.',
            'company_name.required' => 'Company name is required.',
            'company_name.regex' => 'Company name contains invalid characters.',

            // Contact Information
            'contact_no.regex' => 'Please enter a valid phone number.',
            'primary_email.email' => 'Please enter a valid email address.',
            'website_url.url' => 'Please enter a valid website URL.',
            'website_url.regex' => 'Website URL must start with http:// or https://',

            // Address
            'country_id.exists' => 'Please select a valid country.',
            'latitude.between' => 'Latitude must be between -90 and 90.',
            'longitude.between' => 'Longitude must be between -180 and 180.',

            // Files
            'logo.image' => 'Logo must be an image file.',
            'logo.mimes' => 'Logo must be jpeg, png, jpg, gif, svg, or webp.',
            'logo.max' => 'Logo must not be larger than 2MB.',
            'logo.dimensions' => 'Logo must be between 100x100 and 2000x2000 pixels.',

            // Social Media
            'facebook.regex' => 'Please enter a valid Facebook URL.',
            'twitter.regex' => 'Please enter a valid Twitter/X URL.',
            'linkedin.regex' => 'Please enter a valid LinkedIn URL.',
            'instagram.regex' => 'Please enter a valid Instagram URL.',
            'youtube.regex' => 'Please enter a valid YouTube URL.',

            // SEO
            'seo_title.max' => 'SEO title should not exceed 60 characters for best results.',
            'seo_description.max' => 'SEO description should not exceed 160 characters for best results.',
            'seo_description.min' => 'SEO description should be at least 50 characters for best results.',
        ];
    }

    // /**
    //  * Get the validation rules that apply to the request.
    //  *
    //  * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
    //  */
    // public function rules(): array
    // {
    //     return [
    //         // Basic Information
    //         "business_name" => ['required', 'string', 'max:100'],
    //         "pharmacy_name" => ['nullable', 'string', 'max:100'],
    //         "superintendent" => ['nullable', 'string', 'max:150'],
    //         "gphc_premises_reg_no" => ['nullable', 'string', 'max:50'],
    //         "gphc_reg_no" => ['nullable', 'string', 'max:50'],
    //         "branch_code" => ['nullable', 'string', 'max:20'],
    //         "about_company" => ['nullable', 'string', 'max:5000'],

    //         // Contact Information
    //         "contact_no" => ['nullable', 'string', 'max:17'],
    //         "fax_no" => ['nullable', 'string', 'max:17'],
    //         "whatsapp_no" => ['nullable', 'string', 'max:16'],
    //         "admin_email" => ['nullable', 'email', 'max:128'],
    //         "primary_email" => ['nullable', 'email', 'max:128'],
    //         "secondary_email" => ['nullable', 'email', 'max:128'],

    //         // Address Information
    //         'address_1' => ['required', 'string', 'max:100'],
    //         'address_2' => ['nullable', 'string', 'max:100'],
    //         'address_3' => ['nullable', 'string', 'max:100'],
    //         'city_town' => ['required', 'string', 'max:60'],
    //         'postcode' => ['required', 'string', 'max:20'],
    //         'county' => ['nullable', 'string', 'max:60'],
    //         'country_id' => ['nullable', 'integer', 'exists:countries,id'],
    //         'latitude' => ['nullable', 'numeric', 'between:-90,90'],
    //         'longitude' => ['nullable', 'numeric', 'between:-180,180'],

    //         // Company Registration
    //         'company_register_in' => ['nullable', 'string', 'max:100'],
    //         'company_reg_no' => ['nullable', 'string', 'max:50'],

    //         // Social Media
    //         "facebook" => ["nullable", "string", "max:255"],
    //         "instagram" => ["nullable", "string", "max:255"],
    //         "twitter" => ["nullable", "string", "max:255"],
    //         "linkedin" => ["nullable", "string", "max:255"],
    //         "youtube" => ["nullable", "string", "max:255"],

    //         // Settings
    //         "order_type" => ["required", "in:BOTH,CLICK_N_COLLECT,PAYMENT"],
    //         "status" => ["nullable", "in:0,1"],
    //         "slug" => ["nullable", "string", "max:255", "alpha_dash"],

    //         // SEO
    //         "seo_title" => ["nullable", "string", "max:255"],
    //         "seo_keywords" => ["nullable", "string", "max:500"],
    //         "seo_description" => ["nullable", "string", "max:1000"],

    //         // Files (if handling file uploads)
    //         "logo" => ["nullable", "image", "mimes:jpeg,png,jpg,gif", "max:2048"],
    //         "logo_2" => ["nullable", "image", "mimes:jpeg,png,jpg,gif", "max:2048"],
    //         "image" => ["nullable", "image", "mimes:jpeg,png,jpg,gif", "max:2048"],
    //         "fav_icon" => ["nullable", "image", "mimes:ico,png", "max:512"],
    //     ];
    // }

    //   /**
    //  * Get custom error messages for validator errors.
    //  *
    //  * @return array<string, string>
    //  */
    // public function messages(): array
    // {
    //     return [
    //         'business_name.required' => 'Business name is required.',
    //         'business_name.max' => 'Business name cannot exceed 100 characters.',
    //         'address_1.required' => 'Address line 1 is required.',
    //         'city_town.required' => 'City/Town is required.',
    //         'postcode.required' => 'Postcode is required.',
    //         'order_type.required' => 'Order type is required.',
    //         'order_type.in' => 'Order type must be one of: Both, Click & Collect, or Payment.',
    //         'latitude.between' => 'Latitude must be between -90 and 90.',
    //         'longitude.between' => 'Longitude must be between -180 and 180.',
    //         'country_id.exists' => 'Selected country does not exist.',
    //         'primary_email.email' => 'Primary email must be a valid email address.',
    //         'secondary_email.email' => 'Secondary email must be a valid email address.',
    //         'admin_email.email' => 'Admin email must be a valid email address.',
    //         'facebook.url' => 'Facebook must be a valid URL.',
    //         'instagram.url' => 'Instagram must be a valid URL.',
    //         'twitter.url' => 'Twitter must be a valid URL.',
    //         'linkedin.url' => 'LinkedIn must be a valid URL.',
    //         'youtube.url' => 'YouTube must be a valid URL.',
    //     ];
    // }
}
