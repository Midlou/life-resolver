<?php

namespace Src\ReactChart\UseCases;

use Src\ReactChart\Models\ReactChart;
use Src\ReactChart\Listing\ReactChartListing;

class BaseUseCase
{
    /**
     * @return ReactChartListing
     */
    public function getListing()
    {
        return app(ReactChartListing::class);
    }

    protected function find($value, $with = [], $field = 'id')
    {
        return ReactChart::with($with)
            ->where($field, $value)
            ->withTrashed()
            ->first();
    }
}
