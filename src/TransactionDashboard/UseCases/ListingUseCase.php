<?php

namespace Src\TransactionDashboard\UseCases;

use Src\Transaction\UseCases\GetTransactionsSummaryCase;
use Src\ReactChart\UseCases\ListingUseCase as ReactChartListingUseCase;

class ListingUseCase extends BaseUseCase
{
	public function execute()
	{
		$case = new GetTransactionsSummaryCase;
		$summary = $case->execute();

		$case = new ReactChartListingUseCase;
		$charts = $case->paginate()->through(function ($model) {
			return $model->getPrepared();
		});

		return [
			'summary' => $summary,
			'charts' => $charts
		];
	}

}
