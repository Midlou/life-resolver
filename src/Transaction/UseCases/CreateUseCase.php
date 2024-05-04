<?php

namespace Src\Transaction\UseCases;

use Src\Transaction\Models\Transaction;

class CreateUseCase extends BaseUseCase
{
    public function execute($data)
    {
        return transaction(function () use ($data) {
            $model = Transaction::create($data);

            return $model;
        });
    }
}
