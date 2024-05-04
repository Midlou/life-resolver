<?php

namespace Src\Transaction\UseCases;

class RestoreUseCase extends BaseUseCase
{
    public function execute($id)
    {
        $model = $this->find($id);

        return transaction(function () use ($model) {
            $model->restore();

            return $model;
        });
    }
}
