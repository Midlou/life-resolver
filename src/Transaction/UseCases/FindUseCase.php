<?php

namespace Src\Transaction\UseCases;

use Src\Transaction\Models\Transaction;

class FindUseCase extends BaseUseCase
{
	public function execute($id)
	{
        return Transaction::with(['category'])->find($id);
	}

}
