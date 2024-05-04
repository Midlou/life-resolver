<?php

namespace Src\User\UseCases;

use Symfony\Component\HttpKernel\Exception\HttpException;

class DestroyUseCase extends BaseUseCase
{
    public function execute($id)
    {
        if (auth()->user()->id == $id) {
            throw new HttpException(405, "Não é possível deletar o seu próprio usuário.");
        }

        $model = $this->find($id);

        return transaction(function () use ($model) {
            $model->delete();

            return $model;
        });
    }
}
