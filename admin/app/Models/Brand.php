<?php

namespace App\Models;

use App\Filters\FrontendWebsite\BrandFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    /** @use HasFactory<\Database\Factories\BrandFactory> */
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * Apply all relevant item filters.
     * @param Builder    $query
     * @param BrandFilter $filter
     * @return Builder
     */
    public function scopeFilter(Builder $query, BrandFilter $filter): Builder
    {
        return $filter->apply($query);
    }
}

