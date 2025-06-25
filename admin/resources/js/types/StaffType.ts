export interface StaffType {
    id:number
    first_name:string
    last_name?: string;
    dob?: Date;
    gender?: string;
    email?: string;
    contact_number?: string;
    role?: string
    date?: string
    status?: string
    created_at:string
    pharmacy_staff: PharmacyStaff[]
}

export interface PharmacyStaff {
    staff_id: number
    user_type_id:number
    user_role_id:number
    cqc_setting_id:number
    status:string
    pin:string
    is_prescriber:boolean
    registration_number:string
    qualifications:string
    user_role: UserRole[]
}

export interface UserRole {
    id:number
    title:string
    status:string
}