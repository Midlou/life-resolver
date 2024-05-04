<?php

namespace Src\Setting\UseCases;

use Src\Setting\Models\Setting;
use Src\Setting\Listing\SettingListing;

class BaseUseCase
{
	/**
	 * @return SettingListing
	 */
	protected function getListing()
	{
		return app(SettingListing::class);
	}

	protected function find($value, $with = [], $field = 'id'): Setting
	{
		return Setting::with($with)
			->where($field, $value)
			->withTrashed()
			->first();
	}
}
