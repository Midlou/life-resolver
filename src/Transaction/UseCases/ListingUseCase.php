<?php

namespace Src\Transaction\UseCases;

class ListingUseCase extends BaseUseCase
{
    public function all()
    {
        return $this->getListing()
            ->applyFilter()
            ->applySorting()
            ->all();
    }

    public function paginate()
    {
        return $this->getListing()
            ->applyFilter()
            ->applySorting()
            ->with(['category'])
            ->paginate();
    }
}
