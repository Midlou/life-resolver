<?php

namespace Src\Transaction\UseCases;

use Src\Transaction\Models\Transaction;
use Src\Transaction\Listing\TransactionListing;

class BaseUseCase
{
    /**
     * @return TransactionListing
     */
    public function getListing()
    {
        return app(TransactionListing::class);
    }

    protected function find($value, $with = [], $field = 'id')
    {
        return Transaction::with($with)
            ->where($field, $value)
            ->withTrashed()
            ->first();
    }
}
