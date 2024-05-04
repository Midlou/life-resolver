<?php

namespace Src\Transaction\Listing;

use Src\Shared\Listing\Listing;
use Src\Transaction\Models\Transaction;

class TransactionListing extends Listing
{
	protected $model = Transaction::class;

	public function applyFilter()
	{
		parent::applyFilter();

		$this->applyDateFilters();

		return $this;
	}
}
