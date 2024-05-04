<?php

namespace Src\ReactChart\UseCases\ChartGetters;

use Src\Transaction\UseCases\BaseUseCase as TransactionBaseUseCase;

class GetAccumulativeTransactionsUseCase
{
    public function execute()
    {
		$case = new TransactionBaseUseCase;
		$transactions = $case
			->getListing()
			->applyFilter()
			->all();

		$grouped = $transactions->groupBy(function($transaction) {
			return $transaction->transacted_at->format('d-m-y');
		});

		$filters = json_decode(request('filter'));
		$startDate = parse_date($filters->date_start);
		$endDate = parse_date($filters->date_end);

		$daysRange = get_dates_in_range($startDate, $endDate, 'd-m-y');

		$revenueDataset = collect([]);
		$expenseDataset = collect([]);

		$revenueAmount = 0;
		$expenseAmount = 0;

		foreach ($daysRange as $dayLabel) {
			$transactionsOfDay = $grouped[$dayLabel] ?? [];

			foreach ($transactionsOfDay as $transaction) {
				if ($transaction->amount <= 0) {
					$expenseAmount += abs($transaction->amount);
				}

				if ($transaction->amount > 0) {
					$revenueAmount += abs($transaction->amount);
				}
			}

			$revenueDataset->push($revenueAmount);
			$expenseDataset->push($expenseAmount);
		}

		$labels = $daysRange;
		$datasets = [$revenueDataset, $expenseDataset];

		return [
			"labels" => $labels,
			"data" => $datasets
		];
    }
}
