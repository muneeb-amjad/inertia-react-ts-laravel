<?php

namespace App\Filters\FrontendWebsite;

use App\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;

class BlogCategoryFilter extends BaseFilter
{
    protected array $filters = ['search', 'status'];

    protected function search(?string $searchTerm)
    {
        if ($searchTerm) {
            $searchTerm = urldecode($searchTerm);
            $this->builder->where(function ($query) use ($searchTerm) {
                $query->where('title', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('description', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('slug', 'LIKE', "%{$searchTerm}%");
            });
        }
    }

    protected function status(?string $status)
    {
        if (!is_null($status) && $status !== 'all') {
            $this->builder->where('status', $status);
        }
    }

}
