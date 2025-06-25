<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserType extends Model
{
    protected $guarded = ['id'];

    protected static function booted()
    {
        static::created(function ($obj) {
            $obj->hash_id = hashId();
            $obj->save();
        });
    }
}
