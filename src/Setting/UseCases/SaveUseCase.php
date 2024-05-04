<?php

namespace Src\Setting\UseCases;

use Src\Setting\Models\Setting;

class SaveUseCase extends BaseUseCase
{
	public function execute($data)
	{
		return transaction(function () use ($data) {
			foreach ($data as $key => $value) {
				Setting::updateOrCreate([
					'key' => $key
				], [
					'value' => $value
				]);
			}

			return true;
		});
	}
}
