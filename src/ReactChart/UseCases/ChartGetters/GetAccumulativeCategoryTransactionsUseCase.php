<?php

namespace Src\ReactChart\UseCases\ChartGetters;

use Src\Category\Models\Category;
use Src\Transaction\UseCases\BaseUseCase as TransactionBaseUseCase;

class GetAccumulativeCategoryTransactionsUseCase
{
    public function execute()
    {
		$case = new TransactionBaseUseCase;
		$transactions = $case
			->getListing()
			->applyFilter()
			->all();

		$filters = json_decode(request('filter'));
		$startDate = parse_date($filters->date_start);
		$endDate = parse_date($filters->date_end);

		$daysRange = get_dates_in_range($startDate, $endDate, 'd-m-y');

		$datasets = collect([]);
		$transactionCategories = Category::get();
		foreach ($transactionCategories as $category) {
			$filtered = $transactions->filter(function($transaction) use ($category) {
				return $transaction->category_id && $transaction->amount > 0;
			});

			if (!$filtered->count()) continue;

			$data = $this->getData($filtered, $daysRange);

			$datasets->push(
				[
					'label' => $category->name,
					'data' => $data,
					'borderColor' => "rgb(5, 150, 105)",
					'backgroundColor' => "rgba(5, 150, 105, 0.5)",
				],
			);
		}

		$labels = $daysRange;

		return [
			"labels" => $labels,
			"datasets" => $datasets
		];
    }

	private function getData($transactions, $daysRange) {
		$grouped = $transactions->groupBy(function($transaction) {
			return $transaction->transacted_at->format('d-m-y');
		});

		$data = collect([]);

		$amount = 0;
		foreach ($daysRange as $dayLabel) {
			$transactionsOfDay = $grouped[$dayLabel] ?? [];

			foreach ($transactionsOfDay as $transaction) {
				$amount += abs($transaction->amount);
			}

			$data->push($amount);
		}

		return $data;
	}
}
