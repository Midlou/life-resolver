<?php

namespace Src\User\Listing;

use Src\User\Models\User;
use Src\Shared\Listing\Listing;

class UserListing extends Listing
{
	protected $model = User::class;

	public function applyFilter()
	{
		parent::applyFilter();

		if ($type = $this->requestFilter('type')) {
			$this->getBuilder()->where('type', $type);
		}

		return $this;
	}
}
