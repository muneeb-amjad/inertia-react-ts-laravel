<?php

namespace App\Models\FrontendWebsite;

use App\Filters\BlogFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    protected static function booted()
    {
        static::created(function ($obj) {
            $obj->hash_id = hashId();
            $obj->author_id = auth()->id();
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
     * @param BlogFilter $filter
     * @return Builder
     */
    public function scopeFilter(Builder $query, BlogFilter $filter): Builder
    {
        return $filter->apply($query);
    }

    public function category()
    {
        return $this->belongsTo(Blog::class, "category_id", "id");
    }
}
