<?php

namespace Src\Category\UseCases;

use Src\Category\Models\Category;

class CreateUseCase extends BaseUseCase
{
	public function execute($data)
	{
		return transaction(function () use ($data) {
			$model = Category::create($data);

			return $model;
		});
	}
}
