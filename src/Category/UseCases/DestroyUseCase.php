<?php

namespace Src\Category\UseCases;

class DestroyUseCase extends BaseUseCase
{
	public function execute($id)
	{
		$model = $this->find($id);

		return transaction(function () use ($model) {
			$model->delete();

			$model->save();

			return $model;
		});
	}
}
