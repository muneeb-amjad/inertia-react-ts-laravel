<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

class BlogCategoryFilter extends BaseFilter
{
    protected array $filters = ['keywords', 'status'];

    /**
     * @param string|null $searchTerm
     */
    protected function keywords(?string $searchTerm)
    {
        if ($searchTerm) {
            $searchTerm = urldecode($searchTerm);
            $attributes = ['title', 'slug'];

            $this->builder->where(
                function (Builder $query) use ($attributes, $searchTerm) {
                    foreach ($attributes as $attribute) {
                        $query->orWhere($attribute, 'LIKE', "%{$searchTerm}%");
                    }
                }
            );
        }
    }


    protected function status($searchTerm = null)
    {
        if ($searchTerm != '' && strtolower($searchTerm) !== "all") {
            $this->builder->where('status', $searchTerm);
        }
    }
}
