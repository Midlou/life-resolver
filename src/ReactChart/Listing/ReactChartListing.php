<?php

namespace Src\ReactChart\Listing;

use Src\Shared\Listing\Listing;
use Src\ReactChart\Models\ReactChart;

class ReactChartListing extends Listing
{
	protected $model = ReactChart::class;

	public function applyFilter()
	{
		parent::applyFilter();

		return $this;
	}
}
