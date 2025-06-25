<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    protected $guarded = ['id'];

    public const BRANCH_MANAGER = 3;

    protected static function booted()
    {
        static::created(function ($obj) {
            $obj->hash_id = hashId();
            $obj->save();
        });
    }
}
