<?php

namespace Src\Setting\Listing;

use Src\Shared\Listing\Listing;
use Src\Setting\Models\Setting;

class SettingListing extends Listing
{
	protected $model = Setting::class;

	public function applyFilter()
	{
		parent::applyFilter();

		return $this;
	}
}
