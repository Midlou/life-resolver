<?php

namespace Src\Transaction\UseCases;

use Src\Transaction\UseCases\BaseUseCase as TransactionBaseUseCase;

class GetTransactionsSummaryCase extends BaseUseCase
{
	public function execute()
	{
		$case = new TransactionBaseUseCase;
		$transactions = $case
			->getListing()
			->applyFilter()
			->with(['category'])
			->all();

		$expenseTotal = $transactions->filter(function($transaction) {
			return $transaction->amount <= 0;
		})->sum('amount');

		$revenueTotal = $transactions->filter(function($transaction) {
			return $transaction->amount > 0;
		})->sum('amount');

		return [
			'expenses_total' => abs($expenseTotal),
			'revenues_total' => abs($revenueTotal),
			'diff_total' => $revenueTotal + $expenseTotal,
			'categories_summary' => $this->getAmountByCategory($transactions)
		];
	}

	private function getAmountByCategory($transactions) {
		$groupedTransactions = $transactions->groupBy('category_id');


		$categoriesSummary = collect([]);
		foreach ($groupedTransactions as $categoryTransactions) {
			$categoryTotal = $categoryTransactions->sum('amount');

			$categoriesSummary->push([
				'total' => $categoryTotal,
				'category' => $categoryTransactions->first()->category
			]);
		}

		return $categoriesSummary->sortByDesc('total')->values()->toArray();
	}
}
