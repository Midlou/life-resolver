<?php

namespace Src\Category\UseCases;

use Src\Category\Models\Category;

class FindUseCase extends BaseUseCase
{
	public function execute($id)
	{
		return Category::with([])->find($id);
	}
}
