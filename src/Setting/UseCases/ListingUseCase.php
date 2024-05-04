<?php

namespace Src\Setting\UseCases;

class ListingUseCase extends BaseUseCase
{
	public function all()
	{
		return $this->getListing()
			->applyFilter()
			->applySorting()
			->with([])
			->all();
	}

	public function paginate()
	{
		return $this->getListing()
			->applyFilter()
			->applySorting()
			->with([])
			->paginate();
	}
}
