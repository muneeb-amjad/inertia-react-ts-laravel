<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pharmacy extends Model
{
    protected $guarded = ["id"];

    // Override getRouteKeyName method
    // public function getRouteKeyName()
    // {
    //     return 'hash_id';
    // }


    protected static function booted()
    {
        // static::created(function ($obj) {
        //     $obj->hash_id = hashId();

        //     $slug = Str::slug($obj->pharmacy_name);
        //     $obj->slug = $slug;
        //     $exist = self::where("slug", $slug)->first();
        //     if ($exist) {
        //         $obj->slug = Str::slug("$obj->pharmacy_name $obj->id");
        //     }
        //     $obj->save();
        // });
    }
}
