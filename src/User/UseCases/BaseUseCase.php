<?php

namespace Src\User\UseCases;

use Src\User\Models\User;
use Src\User\Listing\UserListing;

class BaseUseCase
{
    /**
     * @return UserListing
     */
    protected function getListing()
    {
        return app(UserListing::class);
    }

    protected function find($value, $with = [], $field = 'id')
    {
        return User::with($with)
            ->where($field, $value)
            ->withTrashed()
            ->first();
    }
}
