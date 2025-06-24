export interface Pharmacy {
    hash_id:string
    pharmacy_name?: string;
    business_name?: string;
    company_reg_no?: number;
    company_register_in?: string;
    superintendent?: string;
    gphc_registration_number?: string;
    vat_number?: number;
    contact_no?: string;
    fax_no?: string;
    primary_email?: string;
    website_url?: string;
    about_company?: string;

    address_1?: string;
    address_2?: string;
    address_3?: string;
    city_town?: string;
    county?: string;
    postcode?: string;
    country_id?: number;
    latitude?: number;
    longitude?: number;

    logo?: string;
    logo_2?: string;
    fav_icon?: string;
    image?: string;

    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;

    seo_title?: string;
    seo_keywords?: string;
    seo_description?: string;

    // hash_id?: string;
    // parent_id?: number;
    // whatsapp_no?: string;
    // secondary_email?: string;
    // branch_code?: string;
    // recaptcha?: string;
    // slug?: string;
    // order_type?: 'BOTH' | 'CLICK_N_COLLECT' | 'PAYMENT';
    // status?: '1' | '0';
}
