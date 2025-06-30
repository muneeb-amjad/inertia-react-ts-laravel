<?php

namespace App\Filters\FrontendWebsite;

use App\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;

class BlogCategoryFilter extends BaseFilter
{
    protected array $filters = ['search', 'status', 'parent_id'];

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
        if ($status && $status !== 'all') {
            $this->builder->where('status', $status);
        }
    }

    protected function parent_id(?string $parentId)
    {
        if ($parentId && $parentId !== 'all') {
            if ($parentId === 'root') {
                $this->builder->whereNull('parent_id');
            } else {
                $this->builder->where('parent_id', $parentId);
            }
        }
    }
}
