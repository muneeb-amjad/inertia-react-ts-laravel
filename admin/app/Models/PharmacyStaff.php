<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PharmacyStaff extends Model
{
    protected $guarded = ['id'];

    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class, 'pharmacy_id', 'id');
    }

    public function userRole()
    {
        return $this->belongsTo(UserRole::class, 'user_role_id', 'id');
    }

    public function userType()
    {
        return $this->belongsTo(UserType::class, 'user_type_id', 'id');
    }

    public function cqcSetting()
    {
        return $this->belongsTo(CqcRegistration::class, 'cqc_setting_id', 'id');
    }
}
