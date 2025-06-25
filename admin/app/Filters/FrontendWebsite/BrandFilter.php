<?php

namespace App\Filters\FrontendWebsite;

use App\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;

class BrandFilter extends BaseFilter
{
    protected array $filters = ['search'];

    protected function search(?string $searchTerm)
    {
        if ($searchTerm) {
            $searchTerm = urldecode($searchTerm);
            $this->builder->where('name', 'LIKE', "%{$searchTerm}%");
        }
    }
}
