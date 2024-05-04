<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Src\ReactChart\Models\ReactChart;

class CreateReactCharts extends Seeder
{

	const CHARTS = [
		[
			'name' => 'Entradas e saidas acumulativas',
			'getter_class' => 'GetAccumulativeTransactionsUseCase',
			'chart_grid_size' => 12,
			'chart_type' => 'line',
			'options' => [
				'plugins' => [
					'title' => [
						'text' => 'Entradas e saídas acumulativas',
						'display' => true,
					],
				],
				'scales' => [
					'y' => [
						'display' => true,
						'type' => 'linear',
						'position' => 'left',
					],
				],
			],
			'data' => [
				'datasets' => [
					[
						'label' => 'Entradas',
						'borderColor' => "rgb(5, 150, 105)",
						'backgroundColor' => "rgba(5, 150, 105, 0.5)",
					],
					[
						'label' => 'Saídas',
						'borderColor' => "rgb(220, 38, 38)",
						'backgroundColor' => "rgba(220, 38, 38, 0.5)",
					]
				]
			]
		],
		[
			'name' => 'Entradas e saidas',
			'getter_class' => 'GetTransactionsUseCase',
			'chart_grid_size' => 12,
			'chart_type' => 'bar',
			'options' => [
				'plugins' => [
					'legend' => [
						'position' => 'top',
					],
					'title' => [
						'display' => true,
						'text' => 'Entradas e saídas',
					],
				],
			],
			'data' => [
				'datasets' => [
					[
						'label' => 'Entradas',
						'borderColor' => "rgb(5, 150, 105)",
						'backgroundColor' => "rgba(5, 150, 105, 0.5)",
					],
					[
						'label' => 'Saídas',
						'borderColor' => "rgb(220, 38, 38)",
						'backgroundColor' => "rgba(220, 38, 38, 0.5)",
					]
				]
			]
		],
		// [
		// 	'name' => 'Entradas e saidas acumulativas por categoria',
		// 	'getter_class' => 'GetAccumulativeCategoryTransactionsUseCase',
		// 	'chart_grid_size' => 12,
		// 	'chart_type' => 'line',
		// 	'options' => [
		// 		'plugins' => [
		// 			'title' => [
		// 				'text' => 'Entradas e saidas acumulativas por categoria',
		// 				'display' => true,
		// 			],
		// 		],
		// 		'scales' => [
		// 			'y' => [
		// 				'display' => true,
		// 				'type' => 'linear',
		// 				'position' => 'left',
		// 			],
		// 		],
		// 	],
		// 	'data' => []
		// ],
	];

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		foreach (self::CHARTS as $chart) {
			ReactChart::updateOrCreate([
				'name' => $chart['name']
			], $chart);
		}
	}
}
