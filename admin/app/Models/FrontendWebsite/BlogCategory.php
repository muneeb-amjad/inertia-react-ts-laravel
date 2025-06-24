<?php

namespace App\Models\FrontendWebsite;

use App\Filters\BlogCategoryFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogCategory extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    protected static function booted()
    {
        static::created(function ($obj) {
            $obj->hash_id = hashId();

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
     * @param BlogCategoryFilter $filter
     * @return Builder
     */
    public function scopeFilter(Builder $query, BlogCategoryFilter $filter): Builder
    {
        return $filter->apply($query);
    }
}
