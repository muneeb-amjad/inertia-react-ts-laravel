<?php

namespace App\Models\FrontendWebsite;

use App\Filters\FrontendWebsite\BlogCategoryFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogCategory extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    /**
     * Apply all relevant filters.
     */
    public function scopeFilter(Builder $query, BlogCategoryFilter $filter): Builder
    {
        return $filter->apply($query);
    }

    /**
     * Get the parent category.
     */
    public function parent()
    {
        return $this->belongsTo(BlogCategory::class, 'parent_id');
    }

    /**
     * Get the child categories.
     */
    public function children()
    {
        return $this->hasMany(BlogCategory::class, 'parent_id');
    }

    /**
     * Get all descendants (children, grandchildren, etc.)
     */
    public function descendants()
    {
        return $this->children()->with('descendants');
    }

    /**
     * Automatically generate slug when creating/updating
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug) && !empty($model->title)) {
                $model->slug = Str::slug($model->title);
            }
            if (empty($model->hash_id)) {
                $model->hash_id = Str::random(20);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('title') && !$model->isDirty('slug')) {
                $model->slug = Str::slug($model->title);
            }
        });
    }

    /**
     * Get the category's full path (Parent > Child > Grandchild)
     */
    public function getFullPathAttribute()
    {
        $path = collect([$this->title]);
        $parent = $this->parent;

        while ($parent) {
            $path->prepend($parent->title);
            $parent = $parent->parent;
        }

        return $path->implode(' > ');
    }

    /**
     * Scope for root categories (no parent)
     */
    public function scopeRoots(Builder $query)
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Scope for active categories
     */
    public function scopeActive(Builder $query)
    {
        return $query->where('status', '1');
    }

    /**
     * Get the full URL for the image
     */
    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        return '/storage/' . $this->image;
    }
}
