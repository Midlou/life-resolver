<?php

namespace Src\Category\UseCases;

class UpdateUseCase extends BaseUseCase
{
	public function execute($id, $data)
	{
		$model = $this->find($id);

		return transaction(function () use ($model, $data) {
			$model->fill($data);

			$model->save();

			return $model;
		});
	}
}
