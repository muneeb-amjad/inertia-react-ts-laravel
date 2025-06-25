<?php

namespace App\Trait;

use Illuminate\Support\Str;

trait HasHashId
{
    protected static function bootHasHashId()
    {
        static::creating(function ($model) {
            if (empty($model->hash_id)) {
                $model->hash_id = self::generateUniqueHashId();
            }
        });
    }

    public static function generateUniqueHashId()
    {
        $hash = Str::random(16);
        
        // Ensure uniqueness
        while (self::where('hash_id', $hash)->exists()) {
            $hash = Str::random(16);
        }
        
        return $hash;
    }

    // public function getRouteKeyName()
    // {
    //     return 'hash_id';
    // }
}
