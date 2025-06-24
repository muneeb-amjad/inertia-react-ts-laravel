<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PharmacyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        // return parent::toArray($request);
        return [
            'hash_id' => $this->hash_id,
            'pharmacy_name' => $this->pharmacy_name,
            'business_name' => $this->business_name,
            'superintendent' => $this->superintendent,
            'contact_no' => $this->contact_no,
            'fax_no' => $this->fax_no,
            'whatsapp_no' => $this->whatsapp_no,
            'primary_email' => $this->primary_email,
            'secondary_email' => $this->secondary_email,
            'about_company' => $this->about_company,
            'branch_code' => $this->branch_code,
            'company_register_in' => $this->company_register_in,
            'company_reg_no' => $this->company_reg_no,
            'address_1' => $this->address_1,
            'address_2' => $this->address_2,
            'address_3' => $this->address_3,
            'city_town' => $this->city_town,
            'postcode' => $this->postcode,
            'county' => $this->county,
            'country_id' => $this->country_id,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'recaptcha' => $this->recaptcha,
            'slug' => $this->slug,
            'order_type' => $this->order_type,
            'status' => $this->status,
            'logo' => $this->logo,
            'logo_2' => $this->logo_2,
            'image' => $this->image,
            'fav_icon' => $this->fav_icon,
            'seo_title' => $this->seo_title,
            'seo_keywords' => $this->seo_keywords,
            'seo_description' => $this->seo_description,
        ];
    }
}
