import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Pharmacy } from '@/types/Pharmacy';
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Staff Users',
        href: '/staff-users/create',
    },
];

type UserRole = {
    id: number;
    title: string;
};

type UserType = {
    id: number;
    title: string;
};

type CQCSetting = {
    id: number;
    business_name: string;
};

type SharedData = {
    userRoles: UserRole[];
    userTypes: UserType[];
    cqcSettings: CQCSetting[]
};

export default function Create() {
    const { userRoles, userTypes, cqcSettings } = usePage<SharedData>().props;

    const { data, setData, errors, post, reset, processing } = useForm({
        _method: 'POST',
        first_name: '',
        last_name: '',
        gender: '',
        contact_number: '',
        user_role_id: 0,
        is_prescriber: false,
        user_type_id: 0,
        registration_number: '',
        qualifications: '',
        pin: '',
        cqc_setting: 0,
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('staff-users.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                console.log("error :: ", errors)
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Staff" />
            <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Staff</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-8">

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first_name">First Name *</Label>
                                        <Input
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            className={errors.first_name ? 'border-red-500' : ''}
                                            required
                                        />
                                        <InputError message={errors.first_name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="last_name">Last Name *</Label>
                                        <Input
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className={errors.last_name ? 'border-red-500' : ''}
                                            required
                                        />
                                        <InputError message={errors.last_name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <Select  value={data.gender}
                                            onValueChange={(value) => setData('gender', value )}
                                        >
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select a Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Genders</SelectLabel>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact_number">Contact Number</Label>
                                        <Input
                                            id="contact_number"
                                            name="contact_number"
                                            value={data.contact_number}
                                            onChange={(e) => setData('contact_number', e.target.value)}
                                            className={errors.contact_number ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.contact_number} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Roles & Responsibilities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="user_role_id">User Role *</Label>
                                        <Select
                                            value={data.user_role_id.toString()}
                                            onValueChange={(value) => setData('user_role_id', parseInt(value) || 0)}
                                        >
                                            <SelectTrigger className={errors.user_role_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select a User Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>User Roles</SelectLabel>
                                                    {userRoles.map((role) => (
                                                        <SelectItem key={role.id} value={role.id.toString()}>
                                                            {role.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.user_role_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox name='is_prescriber' id="is_prescriber" checked={data.is_prescriber}
                                                onCheckedChange={(checked) => setData('is_prescriber', checked as boolean)} />
                                            <Label htmlFor="is_prescriber">Are you a prescriber?</Label>
                                        </div>
                                    </div>
                                </div>

                                {data.is_prescriber && <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="user_type_id">User Type</Label>
                                        <Select
                                            value={data.user_type_id.toString()}
                                            onValueChange={(value) => setData('user_type_id', parseInt(value) || 0)}
                                        >
                                            <SelectTrigger className={errors.user_type_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select a User Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>User Roles</SelectLabel>
                                                    {userTypes.map((role) => (
                                                        <SelectItem key={role.id} value={role.id.toString()}>
                                                            {role.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.user_type_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="registration_number"> {data.user_type_id == 1
                                            ? 'GMC No'
                                            : data.user_type_id == 2
                                                ? 'GPhC No'
                                                : data.user_type_id == 3
                                                    ? 'NMC No'
                                                    : 'Registration Number'}</Label>
                                        <Input
                                            id="registration_number"
                                            name="registration_number"
                                            value={data.registration_number}
                                            onChange={(e) => setData('registration_number', e.target.value)}
                                            className={errors.registration_number ? 'border-red-500' : ''}
                                            required
                                        />
                                        <InputError message={errors.registration_number} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="qualifications">Qualifications</Label>
                                        <Input
                                            id="qualifications"
                                            name="qualifications"
                                            value={data.qualifications}
                                            onChange={(e) => setData('qualifications', e.target.value)}
                                            className={errors.qualifications ? 'border-red-500' : ''}
                                            required
                                        />
                                        <InputError message={errors.qualifications} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="pin">Prescriber Pin</Label>
                                        <Input
                                            id="pin"
                                            name="pin"
                                            value={data.pin}
                                            onChange={(e) => setData('pin', e.target.value)}
                                            className={errors.pin ? 'border-red-500' : ''}
                                            required
                                        />
                                        <InputError message={errors.pin} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="cqc_setting">CQC Settings</Label>
                                        <Select
                                            value={data.cqc_setting.toString()}
                                            onValueChange={(value) => setData('cqc_setting', parseInt(value) || 0)}
                                        >
                                            <SelectTrigger className={errors.cqc_setting ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select a CQC Settings" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>CQC Settings</SelectLabel>
                                                    {cqcSettings.map((setting) => (
                                                        <SelectItem key={setting.id} value={setting.id.toString()}>
                                                            {setting.business_name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.cqc_setting} />
                                    </div>
                                </div>}
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            onChange={(e) => setData('email', e.target.value)}
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            className={errors.email ? 'border-red-500' : ''}
                                            required
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password *</Label>
                                        <Input
                                            id="password"
                                            type='password'
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className={errors.password ? 'border-red-500' : ''}
                                            required
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Button disabled={processing}>{processing ? 'Creating...' : 'Create'}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
