<?php

namespace Src\Category\Listing;

use Src\Shared\Listing\Listing;
use Src\Category\Models\Category;

class CategoryListing extends Listing
{
	protected $model = Category::class;

	public function applyFilter()
	{
		parent::applyFilter();

		if ($catalogIds = $this->requestFilter('catalog_ids')) {
			$this->getBuilder()->whereHas('catalogItems.catalogs', function ($query) use ($catalogIds) {
				$query->whereIn('catalog_id', $catalogIds);
			});
		}

		if ($this->request('has_items')) {
			$this->getBuilder()->whereHas('catalogItems');
		}

		return $this;
	}
}
