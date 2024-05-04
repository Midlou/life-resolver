<?php

namespace Src\Category\UseCases;

use Src\Category\Models\Category;
use Src\Category\Listing\CategoryListing;

class BaseUseCase
{
	/**
	 * @return CategoryListing
	 */
	protected function getListing()
	{
		return app(CategoryListing::class);
	}

	protected function find($value, $with = [], $field = 'id'): Category
	{
		return Category::with($with)
			->where($field, $value)
			->withTrashed()
			->first();
	}
}
