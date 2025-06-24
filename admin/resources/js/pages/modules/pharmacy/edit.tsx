import { type BreadcrumbItem, type SharedData } from '@/types';

import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';


import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Pharmacy } from '@/types/Pharmacy';
import { Country } from '@/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Pharmacy',
        href: '/settings/profile',
    },
];

export default function EditPharmacy() {
    const { pharmacy, countries } = usePage<{
        pharmacy: Pharmacy,
        countries: Record<string, string>
    }>().props;

    const { data, setData, errors, post, processing } = useForm({
        _method: 'PUT',
        hash_id: pharmacy.hash_id || '',
        pharmacy_name: pharmacy.pharmacy_name || '',
        business_name: pharmacy.business_name || '',
        company_reg_no: pharmacy.company_reg_no || '',
        company_register_in: pharmacy.company_register_in || '',
        superintendent: pharmacy.superintendent || '',
        gphc_registration_number: pharmacy.gphc_registration_number || '',
        vat_number: pharmacy.vat_number || '',
        contact_no: pharmacy.contact_no || '',
        fax_no: pharmacy.fax_no || '',
        primary_email: pharmacy.primary_email || '',
        website_url: pharmacy.website_url || '',
        about_company: pharmacy.about_company || '',

        address_1: pharmacy.address_1 || '',
        address_2: pharmacy.address_2 || '',
        address_3: pharmacy.address_3 || '',
        city_town: pharmacy.city_town || '',
        county: pharmacy.county || '',
        postcode: pharmacy.postcode || '',
        country_id: pharmacy.country_id || 0,
        latitude: pharmacy.latitude || 0,
        longitude: pharmacy.longitude || 0,

        logo: null as File | null,
        logo_2: null as File | null,
        image: null as File | null,
        fav_icon: null as File | null,

        facebook: pharmacy.facebook || '',
        twitter: pharmacy.twitter || '',
        linkedin: pharmacy.linkedin || '',
        instagram: pharmacy.instagram || '',
        youtube: pharmacy.youtube || '',

        seo_title: pharmacy.seo_title || '',
        seo_keywords: pharmacy.seo_keywords || '',
        seo_description: pharmacy.seo_description || '',

    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('pharmacy.update', pharmacy.hash_id), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Pharmacy" />

            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-2 bg-white border-b border-gray-200">

                        <form onSubmit={submit} className="space-y-8">
                            {/* Basic Information */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="pharmacy_name">Pharmacy Name *</Label>
                                        <Input
                                            id="pharmacy_name"
                                            value={data.pharmacy_name}
                                            onChange={(e) => setData('pharmacy_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.pharmacy_name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="business_name">Company Name *</Label>
                                        <Input
                                            id="business_name"
                                            value={data.business_name}
                                            onChange={(e) => setData('business_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.business_name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="company_reg_no">Company Registration Number</Label>
                                        <Input
                                            id="company_reg_no"
                                            value={data.company_reg_no}
                                            onChange={(e) => setData('company_reg_no', e.target.value)}
                                        />
                                        <InputError message={errors.company_reg_no} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="company_register_in">Company Registered In</Label>
                                        <Input
                                            id="company_register_in"
                                            value={data.company_register_in}
                                            onChange={(e) => setData('company_register_in', e.target.value)}
                                        />
                                        <InputError message={errors.company_register_in} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="superintendent">Superintendent Pharmacist</Label>
                                        <Input
                                            value={data.superintendent}
                                            onChange={(e) => setData('superintendent', e.target.value)}
                                        />
                                        <InputError message={errors.superintendent} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="gphc_registration_number">GPhC Registration Number</Label>
                                        <Input
                                            id="gphc_registration_number"
                                            value={data.gphc_registration_number}
                                            onChange={(e) => setData('gphc_registration_number', e.target.value)}
                                        />
                                        <InputError message={errors.gphc_registration_number} />
                                    </div>
                                </div>

                                <div className="grid gap-2 mt-4">
                                    <Label htmlFor="vat_number">Vat Number</Label>
                                    <Input
                                        id="vat_number"
                                        value={data.vat_number}
                                        onChange={(e) => setData('vat_number', e.target.value)}
                                    />
                                    <InputError message={errors.vat_number} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="grid gap-2 mt-4">
                                        <Label htmlFor="contact_no">Contact Number</Label>
                                        <Input
                                            id="contact_no"
                                            type="tel"
                                            value={data.contact_no}
                                            onChange={(e) => setData('contact_no', e.target.value)}
                                        />
                                        <InputError message={errors.contact_no} />
                                    </div>

                                    <div className="grid gap-2 mt-4">
                                        <Label htmlFor="fax_no">Fax Number</Label>
                                        <Input
                                            id="fax_no"
                                            value={data.fax_no}
                                            onChange={(e) => setData('fax_no', e.target.value)}
                                        />
                                        <InputError message={errors.fax_no} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="primary_email">Primary Email</Label>
                                        <Input
                                            id="primary_email"
                                            type="email"
                                            value={data.primary_email}
                                            onChange={(e) => setData('primary_email', e.target.value)}
                                        />
                                        <InputError message={errors.primary_email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="website_url">Website URL</Label>
                                        <Input
                                            id="website_url"
                                            type="text"
                                            value={data.website_url}
                                            onChange={(e) => setData('website_url', e.target.value)}
                                        />
                                        <InputError message={errors.website_url} />
                                    </div>
                                </div>
                                <div className="grid gap-2 mt-4">
                                    <Label htmlFor="about_company">About Company</Label>
                                    <textarea
                                        id="about_company"
                                        value={data.about_company}
                                        onChange={(e) => setData('about_company', e.target.value)}
                                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter company description"
                                    />
                                    <InputError message={errors.about_company} />
                                </div>
                            </div>

                            {/* Address Information */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                                <div className="grid grid-cols-1 gap-6">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        <div className="grid gap-2">
                                            <Label htmlFor="address_1">Address Line 1</Label>
                                            <Input
                                                id="address_1"
                                                value={data.address_1}
                                                onChange={(e) => setData('address_1', e.target.value)}
                                                placeholder="Enter address line 1"
                                            />
                                            <InputError message={errors.address_1} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="address_2">Address Line 2</Label>
                                            <Input
                                                id="address_2"
                                                value={data.address_2}
                                                onChange={(e) => setData('address_2', e.target.value)}
                                                placeholder="Enter address line 2"
                                            />
                                            <InputError message={errors.address_2} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="address_3">Address Line 3</Label>
                                            <Input
                                                id="address_3"
                                                value={data.address_3}
                                                onChange={(e) => setData('address_3', e.target.value)}
                                                placeholder="Enter address line 3"
                                            />
                                            <InputError message={errors.address_3} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="city_town">City/Town</Label>
                                            <Input
                                                id="city_town"
                                                value={data.city_town}
                                                onChange={(e) => setData('city_town', e.target.value)}
                                                placeholder="Enter city/town"
                                            />
                                            <InputError message={errors.city_town} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="county">County</Label>
                                            <Input
                                                id="county"
                                                value={data.county}
                                                onChange={(e) => setData('county', e.target.value)}
                                                placeholder="Enter county"
                                            />
                                            <InputError message={errors.county} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="postcode">Postcode</Label>
                                            <Input
                                                id="postcode"
                                                value={data.postcode}
                                                onChange={(e) => setData('postcode', e.target.value)}
                                                placeholder="Enter postcode"
                                            />
                                            <InputError message={errors.postcode} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="country_id">Country</Label>
                                            <Select
                                                value={data.country_id > 0 ? data.country_id.toString() : undefined}

                                                onValueChange={(value) => setData('country_id', parseInt(value) || 0)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a Country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(countries || {}).map(([id, nicename]) => (
                                                        <SelectItem key={id} value={id}>
                                                            {nicename}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.country_id} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        <div className="grid gap-2">
                                            <Label htmlFor="latitude">Latitude</Label>
                                            <Input
                                                id="latitude"
                                                type="number"
                                                step="any"
                                                value={data.latitude}
                                                onChange={(e) => setData('latitude', parseFloat(e.target.value) || 0)}
                                                placeholder="Enter latitude"
                                            />
                                            <InputError message={errors.latitude} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="longitude">Longitude</Label>
                                            <Input
                                                id="longitude"
                                                type="number"
                                                step="any"
                                                value={data.longitude}
                                                onChange={(e) => setData('longitude', parseFloat(e.target.value) || 0)}
                                                placeholder="Enter longitude"
                                            />
                                            <InputError message={errors.longitude} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upload Media */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Media</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="logo">Logo 1</Label>
                                        <Input
                                            id="logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData('logo', e.target.files?.[0] || null)}
                                        />
                                        {pharmacy.logo && (
                                            <div className="text-sm text-gray-500">
                                                Current: {pharmacy.logo}
                                            </div>
                                        )}
                                        <InputError message={errors.logo} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="logo_2">Logo 2</Label>
                                        <Input
                                            id="logo_2"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData('logo_2', e.target.files?.[0] || null)}
                                        />
                                        {pharmacy.logo_2 && (
                                            <div className="text-sm text-gray-500">
                                                Current: {pharmacy.logo_2}
                                            </div>
                                        )}
                                        <InputError message={errors.logo_2} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="fav_icon">Favicon</Label>
                                        <Input
                                            id="fav_icon"
                                            type="file"
                                            accept=".ico,.png"
                                            onChange={(e) => setData('fav_icon', e.target.files?.[0] || null)}
                                        />
                                        {pharmacy.fav_icon && (
                                            <div className="text-sm text-gray-500">
                                                Current: {pharmacy.fav_icon}
                                            </div>
                                        )}
                                        <InputError message={errors.fav_icon} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="image">About Us Image</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        />
                                        {pharmacy.image && (
                                            <div className="text-sm text-gray-500">
                                                Current: {pharmacy.image}
                                            </div>
                                        )}
                                        <InputError message={errors.image} />
                                    </div>
                                    {/* <div className="grid gap-2">
                                        <Label htmlFor="logo">Logo 1</Label>
                                        <Input
                                            id="logo"
                                            type='file'
                                            value={data.logo}
                                            onChange={(e) => setData('logo', e.target.value)}
                                        />
                                        <InputError message={errors.logo} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="logo_2">Logo 2</Label>
                                        <Input
                                            id="logo_2"
                                            type='file'
                                            value={data.logo_2}
                                            onChange={(e) => setData('logo_2', e.target.value)}
                                        />
                                        <InputError message={errors.logo_2} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="fav_icon">Fav Icon</Label>
                                        <Input
                                            id="fav_icon"
                                            type='file'
                                            value={data.fav_icon}
                                            onChange={(e) => setData('fav_icon', e.target.value)}
                                        />
                                        <InputError message={errors.fav_icon} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="image">About Us Image</Label>
                                        <Input
                                            id="image"
                                            type='file'
                                            value={data.image}
                                            onChange={(e) => setData('image', e.target.value)}
                                        />
                                        <InputError message={errors.image} />
                                    </div> */}
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

                                    <div className="grid gap-2">
                                        <Label htmlFor="facebook">Facebook</Label>
                                        <Input
                                            id="facebook"
                                            value={data.facebook}
                                            onChange={(e) => setData('facebook', e.target.value)}
                                        />
                                        <InputError message={errors.facebook} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="twitter">Twitter</Label>
                                        <Input
                                            id="twitter"
                                            value={data.twitter}
                                            onChange={(e) => setData('twitter', e.target.value)}
                                        />
                                        <InputError message={errors.twitter} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="linkedin">Linkedin</Label>
                                        <Input
                                            id="linkedin"
                                            value={data.linkedin}
                                            onChange={(e) => setData('linkedin', e.target.value)}
                                        />
                                        <InputError message={errors.linkedin} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="instagram">Instagram</Label>
                                        <Input
                                            id="instagram"
                                            value={data.instagram}
                                            onChange={(e) => setData('instagram', e.target.value)}
                                        />
                                        <InputError message={errors.instagram} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="youtube">Youtube</Label>
                                        <Input
                                            id="youtube"
                                            value={data.youtube}
                                            onChange={(e) => setData('youtube', e.target.value)}
                                        />
                                        <InputError message={errors.youtube} />
                                    </div>

                                </div>
                            </div>


                            {/* SEO Information */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Information</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="seo_title">SEO Title</Label>
                                        <Input
                                            id="seo_title"
                                            value={data.seo_title}
                                            onChange={(e) => setData('seo_title', e.target.value)}
                                            placeholder="Enter SEO title"
                                        />
                                        <InputError message={errors.seo_title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="seo_keywords">SEO Keywords</Label>
                                        <Input
                                            id="seo_keywords"
                                            value={data.seo_keywords}
                                            onChange={(e) => setData('seo_keywords', e.target.value)}
                                            placeholder="Enter SEO keywords (comma separated)"
                                        />
                                        <InputError message={errors.seo_keywords} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="seo_description">SEO Description</Label>
                                        <textarea
                                            id="seo_description"
                                            value={data.seo_description}
                                            onChange={(e) => setData('seo_description', e.target.value)}
                                            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter SEO description"
                                        />
                                        <InputError message={errors.seo_description} />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-end space-x-4">
                                {/* <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button> */}
                                {/* <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Updating...' : 'Update Pharmacy'}
                                </button> */}
                                <Button disabled={processing}>{processing ? 'Updating...' : 'Update Pharmacy'}</Button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
