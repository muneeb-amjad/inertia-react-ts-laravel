<?php

namespace App\Models;

use App\Filters\FrontendWebsite\PageFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Page extends Model
{

    protected $guarded = ["id"];

    protected static function booted()
    {
        static::created(function ($obj) {
            $obj->hash_id = Str(16);

            $slug = Str::slug($obj->title);
            $obj->slug = $slug;
            $exist = self::where("slug", $slug)->first();
            if ($exist) {
                $obj->slug = Str::slug("$obj->title $obj->id");
            }
            $obj->seo_title = $obj->title;
            $obj->seo_keywords = $obj->title;
            $obj->seo_description = $obj->title;
            $obj->save();
        });
    }

    /**
     * Apply all relevant item filters.
     * @param Builder    $query
     * @param PageFilter $filter
     * @return Builder
     */
    public function scopeFilter(Builder $query, PageFilter $filter): Builder
    {
        return $filter->apply($query);
    }
}
