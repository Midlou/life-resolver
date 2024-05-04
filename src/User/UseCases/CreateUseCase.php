<?php

namespace Src\User\UseCases;

use Src\User\Models\User;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CreateUseCase extends BaseUseCase
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	public function execute($data)
	{
		return transaction(function () use ($data) {
			$model = User::create($data);

			return $model;
		});
	}
}
