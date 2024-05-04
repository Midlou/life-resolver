<?php

namespace Src\ReactChart\UseCases\ChartGetters;

use Src\Transaction\UseCases\BaseUseCase as TransactionBaseUseCase;

class GetTransactionsUseCase
{
    public function execute()
    {
		$case = new TransactionBaseUseCase;
		$transactions = $case
			->getListing()
			->applyFilter()
			->all();

		$grouped = $transactions->groupBy(function($transaction) {
			return $transaction->transacted_at->format('F y');
		});

		$filters = json_decode(request('filter'));
		$startDate = parse_date($filters->date_start);
		$endDate = parse_date($filters->date_end);

		$dateRange = get_dates_in_range($startDate, $endDate, 'F y', 'months');

		$revenueDataset = collect([]);
		$expenseDataset = collect([]);

		foreach ($dateRange as $dateLabel) {
			$revenueAmount = 0;
			$expenseAmount = 0;

			$transactionsOfDay = $grouped[$dateLabel] ?? [];

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

		$labels = $dateRange;
		$datasets = [$revenueDataset, $expenseDataset];

		return [
			"labels" => $labels,
			"data" => $datasets
		];
    }
}
