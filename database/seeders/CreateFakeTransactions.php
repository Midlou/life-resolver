<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Src\Category\Models\Category;
use Src\Transaction\Models\Transaction;

class CreateFakeTransactions extends Seeder
{

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$revenues = json_decode(file_get_contents(storage_path() . "/fake_revenues.json"), true);
		$expenses = json_decode(file_get_contents(storage_path() . "/fake_expenses.json"), true);

		transaction(function () use ($revenues, $expenses) {
			foreach ($revenues as $movement) {
				$this->createTransaction($movement, 'revenue');
			}

			foreach ($expenses as $movement) {
				$this->createTransaction($movement, 'expense');
			}
		});
	}

	function createTransaction($movement, $type = 'revenue')
	{
		$transanctedAt = Carbon::createFromFormat('d/m/Y', $movement['date'])->startOfDay();

		$amount = $type == 'revenue' ? $movement['amount'] : -$movement['amount'];

		$category = Category::firstOrCreate([
			'name' => $movement['category']
		]);

		$createdTransaction = Transaction::create([
			'transacted_at' => $transanctedAt,
			'amount' => $amount,
			'description' => $movement['description'],
			'category_id' => $category->id
		]);
	}
}
